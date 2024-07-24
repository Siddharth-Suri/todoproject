export function CreateTodo(){
    return <div>
        <input style ={{
            margin:10,
            padding:10
        }}type ="text" placeholder="title"></input><br></br>
        <input style ={{
            margin:10,
            padding:10
        }} type ="text" placeholder="description"></input><br></br>
        <button style ={{
            margin:10,
            padding:10
        } }>Add a todo</button>
    </div>
}