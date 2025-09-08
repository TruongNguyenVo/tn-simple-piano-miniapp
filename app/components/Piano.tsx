'use client'
import { useEffect, useRef, useState } from "react";
import PianoKey, { IPianoKey } from "./PianoKey";
import SongSelector, { ISong } from "./SongSelector";


// 1. Khởi tạo dữ liệu
//     Tạo mảng pianoKeys chứa thông tin các phím piano (nốt, tần số, trắng/đen).
const pianoKeys: IPianoKey[] = [
  { note: 'C', frequency: 261.63, isBlack: false },
  { note: 'C#', frequency: 277.18, isBlack: true },
  { note: 'D', frequency: 293.66, isBlack: false },
  { note: 'D#', frequency: 311.13, isBlack: true },
  { note: 'E', frequency: 329.63, isBlack: false },
  { note: 'F', frequency: 349.23, isBlack: false },
  { note: 'F#', frequency: 369.99, isBlack: true },
  { note: 'G', frequency: 392.00, isBlack: false },
  { note: 'G#', frequency: 415.30, isBlack: true },
  { note: 'A', frequency: 440.00, isBlack: false },
  { note: 'A#', frequency: 466.16, isBlack: true },
  { note: 'B', frequency: 493.88, isBlack: false },
];
//     Tạo mảng songs chứa danh sách các bài hát (id, tên, danh sách nốt và thời lượng).
const songs: ISong[] = [
  {
    id: 'twinkle',
    name: '⭐ Twinkle Twinkle Little Star',
    notes: [
      { note: 'C', duration: 500 },
      { note: 'C', duration: 500 },
      { note: 'G', duration: 500 },
      { note: 'G', duration: 500 },
      { note: 'A', duration: 500 },
      { note: 'A', duration: 500 },
      { note: 'G', duration: 1000 },
      { note: 'F', duration: 500 },
      { note: 'F', duration: 500 },
      { note: 'E', duration: 500 },
      { note: 'E', duration: 500 },
      { note: 'D', duration: 500 },
      { note: 'D', duration: 500 },
      { note: 'C', duration: 1000 },
    ],
  },
  {
    id: 'happy-birthday',
    name: '🎂 Happy Birthday',
    notes: [
      { note: 'C', duration: 400 },
      { note: 'C', duration: 200 },
      { note: 'D', duration: 600 },
      { note: 'C', duration: 600 },
      { note: 'F', duration: 600 },
      { note: 'E', duration: 1200 },
      { note: 'C', duration: 400 },
      { note: 'C', duration: 200 },
      { note: 'D', duration: 600 },
      { note: 'C', duration: 600 },
      { note: 'G', duration: 600 },
      { note: 'F', duration: 1200 },
    ],
  },
  {
    id: 'mary-had-a-little-lamb',
    name: '🐑 Mary Had A Little Lamb',
    notes: [
      { note: 'E', duration: 500 },
      { note: 'D', duration: 500 },
      { note: 'C', duration: 500 },
      { note: 'D', duration: 500 },
      { note: 'E', duration: 500 },
      { note: 'E', duration: 500 },
      { note: 'E', duration: 1000 },
      { note: 'D', duration: 500 },
      { note: 'D', duration: 500 },
      { note: 'D', duration: 1000 },
      { note: 'E', duration: 500 },
      { note: 'G', duration: 500 },
      { note: 'G', duration: 1000 },
    ],
  },
];
// Tao mang map phim tren ban phim sang note piano
const keyMap: Record<string, string> = {
    'a': 'C',
    's': 'D',
    'd': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'A',
    'j': 'B',
    // Thêm các phím cho phím đen nếu muốn
    'w': 'C#',
    'e': 'D#',
    't': 'F#',
    'y': 'G#',
    'u': 'A#',
}
const Piano: React.FC = () => {
// 2. Quản lý trạng thái
//     Sử dụng các state:
//         currentNote: nốt đang được chơi.
    const [currentNote, setCurrentNote] = useState<string>('');
//         selectedSong: bài hát đang chọn.
  const [selectedSong, setSelectedSong] = useState<string>('twinkle');
//         isPlaying: trạng thái đang phát bài hát.
//         audioContext: đối tượng Web Audio API để phát âm thanh.
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

//         pressedKeys: tập hợp các nốt đang được nhấn.
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

// 3. Khởi tạo AudioContext
//     Khi component mount, khởi tạo audioContext để phát âm thanh.
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            setAudioContext(context);
            audioContextRef.current = context;
        }
        const handleKeyDown = async (e: KeyboardEvent) => {
            const note = keyMap[e.key.toLowerCase()];
            if (note) {
                await handleKeyPress(note); //lấy hàm này cho cả click và keyboard

            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, []);

// 4. Xử lý phát âm thanh //này nữa thay bằng âm thanh kia
//     Hàm playNote(frequency, duration) dùng Web Audio API để phát âm thanh với tần số và thời lượng tương ứng.
    const playNote =  async (frequency: number, duration: number = 200) => { // hiện tại duration mặc định là 200
        const ctx = audioContextRef.current;
        if (!ctx) return;
        if (ctx.state === "suspended") {
            await ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration / 1000);
    };

// 5. Xử lý khi nhấn phím
//     Hàm handleKeyPress(note):
//         Tìm phím tương ứng trong pianoKeys.
//         Gọi playNote để phát âm thanh.
//         Cập nhật currentNote và pressedKeys để hiển thị trạng thái phím đang nhấn.
    const handleKeyPress = async (note: string) => {
        const key = pianoKeys.find(k => k.note === note);
        if (audioContext && audioContext.state === "suspended") {
            await audioContext.resume();
        }
        if(key){
            console.log(`Dang cho note: ${note} voi frequency la: ${key.frequency}`)
            playNote(key.frequency);
            setCurrentNote(note);
            setPressedKeys(prev => new Set(prev).add(note));
            setTimeout(() => {
                setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.delete(note);
                return newSet;
                });
            }, 150);
        }
    }

//         Sau 150ms, bỏ trạng thái nhấn phím.
// 6. Xử lý phát bài hát
//     Hàm playSong():
//         Tìm bài hát theo selectedSong.
//         Lặp qua từng nốt trong bài hát, phát âm thanh và cập nhật trạng thái phím.
//         Đợi đúng thời lượng mỗi nốt rồi chuyển sang nốt tiếp theo.

// 7. Render giao diện
//     Hiển thị tiêu đề, trạng thái nốt đang chơi.
//     Render các phím trắng và phím đen:
//         Phím trắng: render theo thứ tự, mỗi phím là một component PianoKey.
//         Phím đen: render tuyệt đối, đặt vị trí giữa các phím trắng.
//     Render các nút điều khiển: chọn bài hát, nút phát bài hát.
//     Hiển thị hướng dẫn sử dụng.

    // lấy thông tin của note trắng và note đen
    const whiteKeys = pianoKeys.filter(key => !key.isBlack);
    const blackKeys = pianoKeys.filter(key => key.isBlack);

    return (
        <>
            <div className="hidden md:block mb-4 text-center">
                <div className="inline-flex gap-4 px-4 py-2 bg-gray-100 rounded shadow text-sm">
                    <span><b>A</b>: C</span>
                    <span><b>W</b>: C#</span>
                    <span><b>S</b>: D</span>
                    <span><b>E</b>: D#</span>
                    <span><b>D</b>: E</span>
                    <span><b>F</b>: F</span>
                    <span><b>T</b>: F#</span>
                    <span><b>G</b>: G</span>
                    <span><b>Y</b>: G#</span>
                    <span><b>H</b>: A</span>
                    <span><b>U</b>: A#</span>
                    <span><b>J</b>: B</span>
                </div>
            </div>
            {/* piano key */}
            <div className="relative flex justify-center mb-8">
                <div className="relative flex">
                    {/* note trang voi vi tri la relative */}
                    {whiteKeys.map((key) => (
                        <div key={key.note} className="relative">
                            <PianoKey
                                pianoKey={key} 
                                isPressed = {pressedKeys.has(key.note)}//note co dang duoc bam hay khong
                                onPress = {handleKeyPress}//ham xu ly su kien khi bam
                            />
                        </div>
                    ))}
                    {/* note den voi vi tri la absolute*/}
                    <div className = "absolute inset-0 flex pointer-events-none">
                        {blackKeys.map((key, index) => {
                           const positions = [36, 84, 180, 228, 276]; //du doan khoang cach
                           return (
                            <div
                            key = {key.note}
                            className="absolute pointer-events-auto"
                            style={{ left: `${positions[index]}px` }}
                            >
                                <PianoKey
                                    pianoKey={key}
                                    isPressed={pressedKeys.has(key.note)}
                                    onPress={async (note) => await handleKeyPress(note)}
                                />
                            </div>
                           );
                        })}
                    </div>
                </div>
            </div>
            
            {/* SongSelector */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SongSelector
                    selectedSong={selectedSong}
                    onSongChange={setSelectedSong}
                    songs={songs}
                />
            </div>

        </>
    )
    }

export default Piano
