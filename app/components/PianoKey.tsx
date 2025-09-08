// Định nghĩa cấu trúc dữ liệu cho một phím piano:
//   - note: tên nốt nhạc (ví dụ: "C", "D#", ...)
//   - frequency: tần số của nốt nhạc
//   - isBlack: true nếu là phím đen, false nếu là phím trắng
export interface IPianoKey{
    note: string;
    frequency: number;
    isBlack: boolean;
}

// Tạo props riêng cho PianoKeyProps:
//   - pianoKey: thông tin về phím
//   - isPressed: trạng thái phím (đang nhấn hay không)
//   - onPress: hàm xử lý khi phím được nhấn
type PianoKeyProps = {
    pianoKey: IPianoKey;
    isPressed: boolean;
    onPress: (note: string) => void
};

//Tao component PianoKey nhan vao PianoKeyPros
//tra ve button 
    //co className: neu black thi absolute, nguoc lai thi la relative => neu isPress thi them hover
    // onMouseDown (may tinh), 
    // onTouchStart (dien thoai)
    //<span> la children neu black thi bottom-2 nguoc lai la bottom-4, children la pianoKey.note
const PianoKey = ({pianoKey, isPressed, onPress}: PianoKeyProps) => {
    return (
        <button
            className={`
                    ${
                        //xu ly neu pianoKey.isBlack va //xu ly isPress 
                        pianoKey.isBlack ? 
                        //mau den
                        `bg-gray-800 text-white w-8 h-32 absolute transform -translate-x-1/2 z-10
                        ${isPressed ? 'bg-gray-600' : 'hover:bg-gray-700' }`
                        
                        //mau trang
                        : `bg-white text-gray-800 border border-gray-300 w-12 h-48 relative
                        ${isPressed ? 'bg-gray-100' : 'hover:bg-gray-50'}`
                    }
                    
                    transition-colors duration-75 font-medium text-sm
                    ${pianoKey.isBlack ? 'shadow-lg' : 'shadow-md'}
                    select-none active:scale-95
                `}

            onMouseDown={() => onPress(pianoKey.note)} //may tinh
            onTouchStart={() => onPress(pianoKey.note)} //dien thoai
        >
            <span
                className={
                    pianoKey.isBlack ? 'absolute bottom-2 left-1/2 transform -translate-x-1/2' : 'absolute bottom-4 left-1/2 transform -translate-x-1/2'
                }>
                {pianoKey.note}
            </span>
        </button>
    )
}
export default PianoKey;


// Khi render:
//   - Nếu là phím đen:
//       - Style: màu đen, kích thước nhỏ hơn, vị trí absolute
//       - Nếu đang nhấn: đổi màu
//   - Nếu là phím trắng:
//       - Style: màu trắng, kích thước lớn hơn, vị trí relative
//       - Nếu đang nhấn: đổi màu

// Khi người dùng nhấn hoặc chạm vào phím:
//   - Gọi hàm onPress với tên nốt nhạc

// Hiển thị tên nốt nhạc ở vị trí phù hợp trên phím