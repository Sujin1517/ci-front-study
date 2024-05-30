import { useState } from "react";
import CommentComponent from "./CommentComponent";
import axios from "axios";

function BoardComponent(props) {
    const [ShowComment, setShowComment] = useState(false);
    const [commentData, setCommentData] = useState();
    const ADDR = "http://localhost";

    const getComments = async () => {
        try {
            // const response = await axios.get("/api/boards");
            const response = await axios.get(ADDR+":8081/api/comments/"+props.id);
            console.log(response.data);
            setCommentData(response.data);
            props.loadingEnd();
        } catch (error) {
            console.log(error);
            alert("불러오기 에러!");
            props.loadingEnd();
        }
    }

    const sendComment = async (e) => {
        try {
            props.loadingStart();
            const response = await axios.post(
                // "/api/comments",
                ADDR+":8081/api/comments",
                {
                    boardId: e.boardId,
                    content: e.content
                }
            );
            // console.log(response);
            getComments();
            document.getElementById("input_comment_"+props.id).value = "";
        } catch (error) {
            console.log(error);
            alert("전송 에러!");
        }
    }

    const deleteComment = async (e) => {
        try {
            props.loadingStart();
            // const response = await axios.get("/api/boards");
            const response = await axios.delete(ADDR+":8081/api/comments/"+e);
            // console.log(response.data);
            getComments();
        } catch (error) {
            console.log(error);
            alert("삭제 에러!");
        }
    }

    const changeShopComment = async () => {
        if(!ShowComment) {
            props.loadingStart();
            await getComments();
        }
        setShowComment(!ShowComment);
    }

    return (
        <div
            id={"borad"+props.id}
            style={{
                display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
                position:"relative",
                border:"1px solid Silver", borderRadius:"3px",
                paddingTop:"12px", paddingBottom:"6px", paddingLeft:"15px", paddingRight:"15px",
                maxWidth:"300px", minWidth:"100px"
            }}
        >
            <div style={{fontWeight:"bold"}}>
                {props.name}
            </div>
            <div style={{width:"100%", border:"1px solid Silver", borderTop:"0px", margin:"10px"}}/>
            <div>
                {props.text}
            </div>
            <CommentComponent
                id={props.id}
                loadingStart={props.loadingStart}
                loadingEnd={props.loadingEnd}
                onClick={changeShopComment}
                sendComment={sendComment}
                deleteComment={deleteComment}
                show={ShowComment}
                comments={commentData}
            />
            {/* <div
                onClick={props.onClick}
                style={{
                    position:"absolute", right:"4px", top:"6px", 
                    color:"gray", textAlign:"center", width:"20px", height:"20px",
                    cursor:"pointer"
                }}
            >x</div> */}
        </div>
    );
}

export default BoardComponent;
