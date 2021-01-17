import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import styled from 'styled-components';
import { myFirebase } from '../../firebase/firebase';
import { deleteList, updateBoard } from '../../actions';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles({
    a: { "cursor": "pointer", "display": "block", "fontWeight": "400", "padding": "6px 12px", "position": "relative", "margin": "0 -12px", "textDecoration": "none" }
});


const ActionListMenu = styled.div`
    position: absolute;
    top: 5rem;
    background-color: #FFFFFF;
    border-radius: .3rem;
    width: 20rem;
    height: auto;
    padding: 0 12px 12px 12px;
    color: #6b808c;
    z-index: 5;
    border: 1px solid rgba(0,0,0,0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const Header = styled.div`
    border-bottom: 1px solid #dcdfe3;
    padding: 1.2rem 0;
`;
const Title = styled.label`
    text-align: center;
    display: block;
    font-weight: 400;
    width: 100%;
    font-size: 1rem;
`;
const CloseMenuButton = styled.button`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    border: none;
    color: #6b808c;
    background-color: transparent;
    font-size: 1.5rem;

    &:hover {
        color: #000000;
        cursor: pointer;
    }
`;
const Form = styled.div``;
const Input = styled.input`
    width: 100%;
    height: 2rem;
    padding: 1.5rem .8rem;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    color: #17394d;
    background-color: #ebeef071;
    border: 2px solid #dfe3e6;
    border-radius: .3rem;
    margin: 0rem 0rem 1rem 0rem;

    &:hover {
        background-color: #ebeef0;
    }

    &:focus {
        border: 2px solid #0079bf;
        outline: none;
    }
`;
const SaveButton = styled.button`
    background-color: #5aac44;
    color: white;
    width: 5rem;
    height: 2.5rem;
    border-radius: 3px;
    font-size: 1rem;
    font-weight: 700;
    border: none;

    &:hover {
        filter: brightness(110%);
        cursor: pointer;
    }
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    margin: 1rem 0;
    display: block;
`;

const ListOptions = styled.div`
    display: inline-block;
    margin-right: 15px;
    border-radius: .3rem;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    color: #172b4d;
    opacity: 0.7;
    
    &:hover {
        background-color: #e1e2e6;
        
    }
`;
const ActionList = ({
    handleShowInvite, boardId, listID
}) => {
    const classes = useStyles();
    const [ isAdmin, setIsAdmin ] = useState(false);
    useEffect(() => {
        const user = myFirebase.auth().currentUser.uid;
        myFirebase.database().ref('/board/' + boardId + '/members').orderByChild('uid').equalTo(user).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var role = childSnapshot.val().role
                if (role == 'admin') {
                    setIsAdmin(true)
                }
            })
        })
    })
    const dispatch = useDispatch();
    const store = useStore();
    const handleDeleteList = () => {
        dispatch(deleteList(listID));
        const tempboard = store.getState().board; // ugly solution, try fix
        dispatch(updateBoard(tempboard));
    }
    return (
        <ActionListMenu>
            <Header>
                <Title>Thao Tác</Title>
                <CloseMenuButton onClick={ handleShowInvite }><FontAwesomeIcon icon={ faTimes } /></CloseMenuButton>
            </Header>
            <div>
                <ul style={ { "listStyle": "none", "margin": "0", "padding": "0" } }>
                    <li>
                        <a className={ classes.a }>
                            Thêm thẻ...
                    </a>
                    </li>
                    <li>
                        <a className={ classes.a }>
                            Sao Chép Danh Sách...
                    </a>
                    </li>
                    <li>
                        <a className={ classes.a }>
                            Di Chuyển Danh Sách...
                    </a>
                    </li>
                    <li>
                        <a className={ classes.a }>
                            Theo dõi
                    </a>
                    </li>
                </ul>
                <hr />
                <ul style={ { "listStyle": "none", "margin": "0", "padding": "0" } }>
                    <li>
                        <a className={ classes.a }>
                            Sắp xếp theo...
                    </a>
                    </li>

                </ul>
                <hr />
                <ul style={ { "listStyle": "none", "margin": "0", "padding": "0" } }>
                    <li>
                        <a className={ classes.a }>
                            Di chuyển tất cả thẻ trong danh sách này...
                    </a>
                    </li>
                    <li>
                        <a className={ classes.a }>
                            Lưu Trữ Tất Cả Các Thẻ trong Danh Sách Này...
                    </a>
                    </li>
                </ul>
                <hr />
                <ul style={ { "listStyle": "none", "margin": "0", "padding": "0" } }>
                    <li>
                        <a className={ classes.a }>
                            Lưu trữ danh sách này
                    </a>
                    </li>
                    <li>
                        { isAdmin ? <ListOptions onMouseUp={ handleDeleteList }><FontAwesomeIcon icon={ faTrash } />    Xóa danh sách này</ListOptions> : null }
                    </li>
                </ul>
            </div>
        </ActionListMenu>
    );
}

export default ActionList;