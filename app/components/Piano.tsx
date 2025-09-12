'use client'
import { Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PianoKey, { IPianoKey } from "./PianoKey";
import PlayButton from "./PlayButton";
import ShareSongModal from "./ShareSongModel";
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
            // Thêm đoạn lặp lại
            { note: 'G', duration: 500 },
            { note: 'G', duration: 500 },
            { note: 'F', duration: 500 },
            { note: 'F', duration: 500 },
            { note: 'E', duration: 500 },
            { note: 'E', duration: 500 },
            { note: 'D', duration: 1000 },
            { note: 'G', duration: 500 },
            { note: 'G', duration: 500 },
            { note: 'F', duration: 500 },
            { note: 'F', duration: 500 },
            { note: 'E', duration: 500 },
            { note: 'E', duration: 500 },
            { note: 'D', duration: 1000 },
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
            // Thêm đoạn lặp lại
            { note: 'C', duration: 400 },
            { note: 'D', duration: 600 },
            { note: 'A', duration: 600 },
            { note: 'F', duration: 600 },
            { note: 'E', duration: 600 },
            { note: 'D', duration: 1200 },
            { note: 'A#', duration: 400 },
            { note: 'A#', duration: 200 },
            { note: 'A', duration: 600 },
            { note: 'F', duration: 600 },
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
            // Thêm đoạn lặp lại
            { note: 'E', duration: 500 },
            { note: 'D', duration: 500 },
            { note: 'C', duration: 500 },
            { note: 'D', duration: 500 },
            { note: 'E', duration: 500 },
            { note: 'E', duration: 500 },
            { note: 'E', duration: 1000 },
            { note: 'E', duration: 500 },
            { note: 'D', duration: 500 },
            { note: 'D', duration: 500 },
            { note: 'E', duration: 500 },
            { note: 'D', duration: 500 },
            { note: 'C', duration: 1500 },
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
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const isPlayingRef = useRef(false);
//         audioContext: đối tượng Web Audio API để phát âm thanh.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

//         pressedKeys: tập hợp các nốt đang được nhấn.
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    const [showShareModal, setShowShareModal] = useState(false);
// Thêm state cho record
    const [isRecording, setIsRecording] = useState(false);
    const isRecordingRef = useRef(false);
    const [recordedNotes, setRecordedNotes] = useState<{note: string, duration: number}[]>([]);
    const recordStartTimeRef = useRef<number | null>(null);
    const lastNoteTimeRef = useRef<number | null>(null);
// Đổi songs thành state để thêm bài record động
    const [songsState, setSongsState] = useState<ISong[]>(songs);

// Khi bắt đầu record
    const startRecording = () => {
        setRecordedNotes([]);
        // console.log(Date.now());
        setIsRecording(true);
        // console.log(isRecording);
        recordStartTimeRef.current = Date.now();
        lastNoteTimeRef.current = Date.now();
        // console.log(recordStartTimeRef, lastNoteTimeRef);
    };
// Khi dừng record
    const stopRecording = () => {
        setIsRecording(false);
        recordStartTimeRef.current = null;
        lastNoteTimeRef.current = null;
        // Thêm bài record mới vào danh sách bài hát với id riêng
        if (recordedNotes.length > 0) {
            const newId = `recorded-${Date.now()}`;
            const recordedSong: ISong = {
                id: newId,
                name: `🎤 My Record ${new Date().toLocaleTimeString()}`,
                notes: recordedNotes,
            };
            setSongsState(prev => [...prev, recordedSong]);
            setSelectedSong(newId);
        }
    };

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
            if(showShareModal) return;
            const note = keyMap[e.key.toLowerCase()];
            if (note) {
                await startNote(note);
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if(showShareModal) return;
            const note = keyMap[e.key.toLowerCase()];
            if (note) {
                stopNote(note);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, [showShareModal]);

    useEffect(() => {
    isRecordingRef.current = isRecording;
    }, [isRecording]);

    //disable keyboard

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

    // Khai báo ref:
    const oscillatorsRef = useRef<Record<string, {oscillator: OscillatorNode, gainNode: GainNode}>>({});

    // startNote: ramp-up gain cho tiếng mềm mại
    const startNote = async (note: string) => {
        // console.log(showShareModal);
        if(showShareModal) return;
        const key = pianoKeys.find(k => k.note === note);
        const ctx = audioContextRef.current;
        if (!key || !ctx) return;
        if (ctx.state === "suspended") await ctx.resume();
        if (oscillatorsRef.current[note]) return;

        // console.log(isRecording, recordStartTimeRef.current, lastNoteTimeRef.current);
            // Thêm đoạn này:
        if (
            isRecordingRef.current &&
            recordStartTimeRef.current !== null &&
            lastNoteTimeRef.current !== null
        ) {
            const now = Date.now();
            const lastTime = lastNoteTimeRef.current;
            const startTime = recordStartTimeRef.current
            setRecordedNotes(prev => {
                if (prev.length === 0) {
                    // duration là thời gian từ lúc bắt đầu record đến lúc bấm phím đầu tiên
                    return [{ note, duration: now - startTime }];
                } else {
                    const duration = now - lastTime;
                    return [...prev, { note, duration }];
                }
            });
            console.log("Recorded note:", note);
            lastNoteTimeRef.current = now;
        }
        else{
            console.log("dang k record");
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(key.frequency, ctx.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);

        oscillator.start(ctx.currentTime);

        oscillatorsRef.current[note] = {oscillator, gainNode};
        setCurrentNote(note);
        setPressedKeys(prev => new Set(prev).add(note));
    };

    // stopNote: ramp-down gain cho tiếng mềm mại
    const stopNote = (note: string) => {
        if(showShareModal) return;
        const ctx = audioContextRef.current;
        const oscObj = oscillatorsRef.current[note];
        if (oscObj && ctx) {
            const {oscillator, gainNode} = oscObj;
            gainNode.gain.cancelScheduledValues(ctx.currentTime);
            gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            oscillator.stop(ctx.currentTime + 0.25);
            oscillator.onended = () => {
                gainNode.disconnect();
                oscillator.disconnect();
            };
            delete oscillatorsRef.current[note];
        }
        setPressedKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(note);
            return newSet;
        });
        setCurrentNote('');
    };

//         Sau 150ms, bỏ trạng thái nhấn phím.
// 6. Xử lý phát bài hát
//     Hàm playSong():
//         Tìm bài hát theo selectedSong.
//         Lặp qua từng nốt trong bài hát, phát âm thanh và cập nhật trạng thái phím.
//         Đợi đúng thời lượng mỗi nốt rồi chuyển sang nốt tiếp theo.
    const playSong = async () => {
        const song = songsState.find(s => s.id === selectedSong);
        //neu khong tim thay hoac dang phat thi return 
        if(!song){
            return;
        }
        setIsPlaying(true);
        isPlayingRef.current = true; //update ref
        //lap qua cac note cua song do
        for(const noteData of song.notes){
            if(!isPlayingRef.current) break; //pause
            //tim key
            const key = pianoKeys.find(k => k.note === noteData.note);
            if(key){
                playNote(key.frequency, noteData.duration);
                setCurrentNote(noteData.note);
                setPressedKeys(prev => new Set(prev).add(noteData.note));

                await new Promise(resolve => setTimeout(resolve, noteData.duration));

                setPressedKeys(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(noteData.note);
                    return newSet;
                });
            }
        }
        setIsPlaying(false);
        isPlayingRef.current = false; //update again
        setCurrentNote('');
    }

    const handlePlayButton = () => {
        if (isPlaying) {
            setIsPlaying(false); // Dừng phát
            isPlayingRef.current = false; //update again and again
        } else {
            playSong(); // Bắt đầu phát
        }
    };

    // lấy thông tin của note trắng và note đen
    const whiteKeys = pianoKeys.filter(key => !key.isBlack);
    const blackKeys = pianoKeys.filter(key => key.isBlack);
    // Tìm bài hát đang chọn
    const selectedSongObj = songsState.find(song => song.id === selectedSong);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Music className="text-purple-600 w-8 h-8" />
                <h1 className="text-3xl font-bold text-gray-800">Simple Piano Mini App</h1>
                <div className="ml-auto flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="text-blue-600 font-medium">🎵 Current Note:</span>
                    <span className="text-blue-800 font-bold text-lg">{currentNote || 'C'}</span>
                </div>
            </div>
            {/* Khung hướng dẫn */}
            <div className="hidden md:block mb-4 text-center">
                <div className="inline-flex gap-4 px-4 py-2 bg-gray-100 rounded shadow text-sm text-gray-700 font-semibold">
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
                                isPressed = {pressedKeys.has(key.note)}
                                onPress = {startNote}
                                onRelease = {stopNote}
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
                                    onPress={startNote}
                                    onRelease={stopNote}
                                />
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* thanh dieu khien o duoi */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* SongSelector */}
                <SongSelector
                    selectedSong={selectedSong}
                    onSongChange={setSelectedSong}
                    songs={songsState}
                />
                {/* PlayButton */}
                <PlayButton 
                    isPlaying = {isPlaying}
                    onPlay={handlePlayButton}
                />
                {/* Record Button */}
                <button
                    className={`px-4 py-2 rounded font-bold ${isRecording ? "bg-red-500 text-white" : "bg-yellow-400 text-black"}`}
                    onClick={() => isRecording ? stopRecording() : startRecording()}
                >
                    {isRecording ? "Stop Recording" : "Record"}
                </button>
                {/* Share Button */}
                <button
                    className="px-4 py-2 rounded font-bold bg-blue-500 text-white"
                    onClick={() => setShowShareModal(true)}
                    disabled={!selectedSongObj}
                >
                    Share
                </button>
                {/* Modal chia se */}
                {selectedSongObj && (
                    <ShareSongModal 
                        song={selectedSongObj} 
                        open={showShareModal} 
                        onClose={() => setShowShareModal(false)}
                        onShare={(title, description) => {
                            // Xử lý chia sẻ bài hát có id là selectedSongObj.id
                            console.log("Share song:", selectedSongObj.id, title, description, selectedSongObj.notes);
                            setShowShareModal(false);
                        }}                 
                    />
                )}
            </div>

        </div>
    )
    }

export default Piano
// 7. Render giao diện
//     Hiển thị tiêu đề, trạng thái nốt đang chơi.
//     Render các phím trắng và phím đen:
//         Phím trắng: render theo thứ tự, mỗi phím là một component PianoKey.
//         Phím đen: render tuyệt đối, đặt vị trí giữa các phím trắng.
//     Render các nút điều khiển: chọn bài hát, nút phát bài hát.
//     Hiển thị hướng dẫn sử dụng.
