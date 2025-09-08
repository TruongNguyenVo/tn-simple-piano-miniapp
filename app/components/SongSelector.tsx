// Định nghĩa kiểu dữ liệu ISong (id, name, notes) //ISong: Chuẩn hóa dữ liệu bài hát để dễ quản lý.
export interface ISong{
    id: string,
    name: string,
    notes: {note: string, duration: number}[], //mang gom 2 phan la note va duration
}
// Nhận vào:
    // selectedSong,  //Biết bài hát nào đang chọn.
    // songs,  //Danh sách bài hát để hiển thị.
    // onSongChange //Báo cho cha khi đổi bài hát.
const SongSelector: React.FC<{
    selectedSong: string;
    songs: ISong[]; //mang cac bai hat
    onSongChange: (songId: string) => void; //ham onSongChange nhan vao id => void
}> = ({selectedSong, onSongChange, songs}) => {
    return (
        // Render dropdown <select>: //Dropdown: Cho phép người dùng chọn bài hát để phát.
        //   - Hiển thị danh sách bài hát từ songs
        //   - Khi đổi lựa chọn, gọi onSongChange với id mới
        <select
            value={selectedSong}
            onChange={(e) => onSongChange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                hover:bg-gray-50 transition-colors cursor-pointer min-w-64"
        >
            {songs.map((song:ISong) =>(
                <option key={song.id} value={song.id}>
                    {song.name}
                </option>
            ))}
        </select>
    );

};

// Xuất component
export default SongSelector;
