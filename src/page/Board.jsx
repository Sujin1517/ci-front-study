import axios from "axios";
import { useEffect, useState } from "react";
import BoardComponent from "../component/BoardComponent";

function Board() {
    const [BoardData, setBoardData] = useState();

    const getBoards = async () => {
        try {
            const response = await axios.get("http://34.28.204.36:8080/api/boards");
            console.log(response.data);
            setBoardData(response.data);
        } catch (error) {
            console.log(error);
            alert("불러오기 에러!");
        }
    }

    const sendBoard = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://34.28.204.36:8080/api/boards",
                {
                    name: document.getElementById("input_name").value,
                    text: document.getElementById("input_text").value,
                }
            );
            console.log(response);
            getBoards();
        } catch (error) {
            console.log(error);
            alert("전송 에러!");
        }
    }

    const deleteBoard = async (id) => {
        try {
            const response = await axios.delete("http://34.28.204.36:8080/api/boards/" + id);
            console.log(response.data);
            getBoards();
        } catch (error) {
            console.log(error);
            alert("삭제 에러!");
        }
    }

    useEffect(() => {
        getBoards();
        setInterval(getBoards, 10000);
    }, [])

    return (
        <div style={{width:"100svw", display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
            <div style={{width:"300px", marginTop:"20px", border:"1px solid Silver", borderRadius:"3px", padding:"15px"}}>
                <form
                    style={{display:"flex", flexDirection:"column", gap:"10px"}}
                    onSubmit={(e) => sendBoard(e)}
                >
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <label style={{width:"50px"}}>Name</label>
                        <input style={{width:"243px", height:"20px"}} required id="input_name"/>
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <label style={{width:"50px"}}>Text</label>
                        <textarea style={{width:"243px", maxWidth:"243px"}} required id="input_text"/>
                    </div>
                    <input
                        type="submit"
                        style={{height:"30px", backgroundColor:"#fff", borderRadius:"3px"}}
                        value={"발☆사"}
                    />
                </form>
            </div>

            <div style={{marginTop:"30px", display:"flex", flexDirection:"column", gap:"5px"}}>
                {BoardData?.map((e) => (
                    <BoardComponent id={e.id} name={e.name} text={e.text} onClick={() => deleteBoard(e.id)} />
                ))}
            </div>
        </div>
    );
}

export default Board;
