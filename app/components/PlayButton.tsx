// Nhận vào: 
    // isPlaying (đang phát nhạc hay không): bool 
    // onPlay (hàm phát nhạc): input: rong, output: void
// Render nút <button>:
//   - Khi bấm gọi onPlay
//   - Nếu đang phát thì disable nút và đổi chữ thành "Playing..."
//   - Nếu chưa phát thì hiện chữ "Play"
// Xuất component
const PlayButton: React.FC<{
    isPlaying: boolean;
    onPlay: () => void;
}> = ({isPlaying, onPlay}) =>{
    return (
        <button
            onClick={onPlay}
            // disabled={isPlaying}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400
                text-white font-medium rounded-lg transition-colors duration-200
                flex items-center gap-2 shadow-lg hover:shadow-xl
                disabled:cursor-not-allowed active:scale-95"
        >
            <span className={`text-lg ${isPlaying ? 'animate-pulse' : ''}`}>
                {isPlaying ? '⏸' : '▶'}
            </span>
            {isPlaying ? 'Playing...' : 'Play'}
        </button>
    )
}

export default PlayButton;

