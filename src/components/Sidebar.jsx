import React from 'react';
import "./Sidebar.css";


const Sidebar = ({ onAddNote, notes, onDeleteNote, activeNote, setActiveNote }) => {

    const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

    return (
        <div className='app-sidebar'>
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button onClick={onAddNote}>追加</button>
            </div>
            <div className="app-sidebar-notes">

                {sortedNotes.map((note) => (
                    //setActiveNote(note.id)のnote.idがuseStateで宣言したactiveNoteと等しかった時に、クラス名の"active"を付与する
                    <div className={`app-sidebar-note ${note.id === activeNote && "active"}`}
                        key={note.id}
                        //setActiveNote()の引数に入れることによりfalseからtrueになる
                        onClick={() => setActiveNote(note.id)}>

                        {/* ↑クリックした際にそのクリックしたnoteのidをactiveNote内に入り(setActiveNote(note.id)としてるため)
                                入ったidとmap関数で一つ一つ取得したnote内のidと比較し、一致しているのであれば"active"を付与する
                            */}






                        <div className="sidebar-note-title">
                            <strong>{note.title}</strong>
                            {/* onClickのメソッドをアロー関数で宣言している理由としては、
                            アロー関数でないとページがレンダリングされた際に勝手に呼ばれてしまうため */}
                            <button onClick={() => onDeleteNote(note.id)}>削除</button>
                        </div>
                        <p>{note.content}</p>
                        {/* new Date().toLocalDateString("ja-JP")で日本時間に変更 */}
                        <small>最後の修正日 : {new Date(note.modDate).toLocaleDateString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                        )}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;