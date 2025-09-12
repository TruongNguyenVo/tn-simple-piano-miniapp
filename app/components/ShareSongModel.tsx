import React, { useState } from "react";
import { ISong } from "./SongSelector";

type ShareSongModalProps = {
    song: ISong;
    open: boolean;
    onClose: () => void;
    onShare: (title: string, description: string) => void;
};

const ShareSongModal: React.FC<ShareSongModalProps> = ({ song, open, onClose, onShare }) => {
    const [title, setTitle] = useState(song.name || "");
    const [description, setDescription] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Chia sẻ bài hát</h2>
                <label className="block mb-2 font-semibold">Tiêu đề</label>
                <input
                    className="w-full border rounded px-3 py-2 mb-3"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề bài hát"
                />
                <label className="block mb-2 font-semibold">Mô tả</label>
                <textarea
                    className="w-full border rounded px-3 py-2 mb-3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Nhập mô tả (tuỳ chọn)"
                />
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Xem trước bài hát:</label>
                    <ul className="bg-gray-50 rounded p-2 max-h-32 overflow-auto text-sm">
                        {song.notes.map((note, idx) => (
                            <li key={idx}>{note.note} - {note.duration}ms</li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-2 justify-end">
                    <button
                        className="px-4 py-2 rounded bg-gray-300 text-gray-800 font-bold"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white font-bold"
                        onClick={() => onShare(title, description)}
                    >
                        Chia sẻ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareSongModal;