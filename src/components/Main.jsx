import React from 'react';
import "./Main.css";
import reactMarkdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';

const Main = ({ activeNote, onUpdateNote }) => {

    //valueはinput内のテキストのこと
    const onEditNote = (key, value) => {
        onUpdateNote({
            ...activeNote,
            //動的key(inputで呼ばれた場合"title"が、textareaで呼ばれた場合"content"が呼ばれ動的に変化する)
            [key]: value,
            modDate: Date.now(),
        });
    }


    if (!activeNote) return <div className='no-active-note'>ActiveNoteが選択されていません</div>

    return (
        <div className='app-main'>
            <div className="app-main-note-edit">
                <input
                    id="title"
                    type="text"
                    value={activeNote.title}
                    onChange={(e) => onEditNote("title", e.target.value)}
                />
                <textarea
                    id=""
                    placeholder='内容を記入'
                    onChange={(e) => onEditNote("content", e.target.value)}
                ></textarea>
            </div>
            <div className="app-main-note-preview">
                <h1 className='preview-title'>{activeNote.title}</h1>
                <ReactMarkdown className="markdown-preview">{activeNote.content}</ReactMarkdown>
            </div>
        </div>
    )
}

export default Main;