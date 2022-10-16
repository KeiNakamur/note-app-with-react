import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

function App() {

  //localstorageのデータを取得するためにはjson型をjs型に直す必要があるので、JSON.parseで囲う
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  //選択されたnoteを判別するため
  const [activeNote, setActiveNote] = useState(false);

  //レンダリングされた際にデータが飛ばないようにするためのuseEffect
  useEffect(() => {
    //ローカルストレージにノートを保存する
    //ローカルストレージにはjson形式でないと値が入らないので注意
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const onAddNote = () => {
    console.log("新しくノートを追加しました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    //setNotes(newNoteだと、要素が追加されないので、スプレッド構文で記述する必要がある)
    setNotes([...notes, newNote]);
    console.log(notes);
  }

  const onDeleteNote = (id) => {
    //削除する際にはfilter関数を用いて、削除するidと対象のidが一致していた場合にする必要があるので
    //filter関数を使用する
    const filterNotes = notes.filter((note) => note.id !== id);
    //filterで対象外のものを残してsetNotesで渡している
    //「消す」のではなく、対象外のものを残す
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  const onUpdateNote = (updatedNote) => {
    //修正された新しいnoteの配列を返す
    const updatedNotesArray = notes.map((note) => {
      //これから編集するノートのidと、map関数で展開したノートのidが等しい時
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    //最終的にはupdatedNotesArrayをsetNotesで更新する
    setNotes(updatedNotesArray);
  }


  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App;
