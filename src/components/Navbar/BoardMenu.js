import { faAngleLeft, faEllipsisH, faPaintBrush, faSearch, faTrash, faTasks, faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState, useHistory } from 'react';
import Loader from "react-loader-spinner";
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useParams, Redirect } from 'react-router-dom'
import { changeBackground, getPhotosList } from '../../actions/';
import { myFirebase } from "../../firebase/firebase";
import { updateBoardArchive } from '../../actions/'
import { Button, Grid, TextField } from "@material-ui/core";
import ReplayIcon from '@material-ui/icons/Replay';
import ListAltIcon from '@material-ui/icons/ListAlt';
const BackgroundMenu = styled.div`
    display: inline-block;
    overflow-x: hidden;

    width: 340px;
    height: 90%;
    background-color: whitesmoke;
    z-index: 1000;
    transform: ${(props) => props.changeBackground ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    position: absolute;
`;

const PhotoMenu = styled.div`
    display: inline-block;
    overflow-x: hidden;

    width: 340px;
    height: 90%;
    background-color: whitesmoke;
    z-index: 1000;
    transform: ${(props) => props.changePhoto ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    position: absolute;
`;

const BackgroundTile = styled.div`
    background-color: ${(props) => props.color || 'blue'};
    height: 10%;
    width: 40%;
    margin: .5rem;
    margin-top: 1rem;
    border-radius: .8rem;
    display: inline-block;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const PhotoTile = styled.div`
    background-image: ${(props) => `url(` + props.url + `)` || ''};
    background-size: contain;
    background-size: cover;
    height: 10%;
    width: 40%;
    margin: .5rem;
    margin-top: 1rem;
    border-radius: .8rem;
    display: inline-block;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const BackgroundColorMenu = styled.div`
    display: inline-block;
    overflow-x: hidden;

    width: 340px;
    height: 90%;
    background-color: whitesmoke;
    z-index: 1001;
    transform: ${(props) => props.changeBackgroundColor ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    position: absolute;
`;

const MenuWrapper = styled.div`
    z-index: 999;
    width: 340px;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background-color: whitesmoke;
    transform: ${(props) => props.showBoardMenu ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    display: block;
    height: 100%;
`;

const Menu = styled.div`
    box-sizing: border-box;
    width: 340px;
    padding: 0px 12px;
    color: #172b4d;
`;

const MenuItems = styled.div`
    border-bottom: 1px solid #ccd2d7;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 1.2rem;

    font-weight: 500;
    color: #193345;
    text-align: center;
`;

const MenuArrow = styled.button`
    border: none;
    font-size: 1.5rem;
    background: none;
    color: #42526e;
    font-weight: bold;

    position: absolute;
    top: 16px;
    transition: .25s all;
    left: 2rem;

    &:hover {
        color: #193345;
        cursor: pointer;
    }
`;

const CloseMenu = styled.button`
    border: none;
    font-size: 1.5rem;
    background: none;
    color: #42526e;
    position: absolute;
    top: 18px;
    right: 12px;

    &:hover {
        color: #193345;
        cursor: pointer;
    }
`;

const OptionsList = styled.ul`
    text-align: left;
    list-style: none;
    cursor: pointer;
    padding-inline-end: 40px;
`;

const OptionsItem = styled.li`
    display: flex;
    align-items: center;
    color: #193345;
    font-size: 1rem;
    padding: .4rem .4rem;
    line-height: 1.2rem;
    border-radius: 3px;
    font-weight: 600;
    &:hover {
        background-color: #6b808c3f;
    }
`;

const Icon = styled.div`
    color: #193345;
    padding: .3rem;
    margin-right: .3rem;
`;

const SearchIcon = styled.span`
    position: absolute;
    left: 10px;
    top: 15px;
    color: #42526e;
`;

const SearchPhotos = styled.input`
    box-sizing: border-box;
    width: 316px;
    background-color: #fafbfc;
    display: block;
    color: #172b4d;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    margin: 8px 0px;
    padding: 0.6rem 2rem;
    border: none;
    font-size: 14px;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;

    &:focus{
        box-shadow: inset 0 0 0 2px rgb(0, 121, 191);
        background-color: #FFFFFF;
    }
`;

const Listlts = styled.div`
transform: ${(props) => props.listlt ? 'translateX(0)' : `translateX(100%)`};
`;
const ListlT = styled.div`
transform: ${(props) => props.listlt ? 'translateX(0)' : `translateX(100%)`};
`;
const Listlts1 = styled.div`
height: 80px;
margin: 0;
text-align: center;
margin-top: 25px;
background-color: #eaecf0;
justify-content: space-between;
padding: 28px 12px;
`;

function BoardMenu(props) {

    // Background states
    const [ changeBackground, setChangeBackground ] = useState(false);
    const [ changePhoto, setChangePhoto ] = useState(false);
    const [ changeBackgroundColor, setChangeBackgroundColor ] = useState(false);
    const [ changeBackground1, setChangeBackground1 ] = useState(false);
    const [ changePhoto1, setChangePhoto1 ] = useState(false);
    const [ changeBackgroundColor1, setChangeBackgroundColor1 ] = useState(false);
    const [ changebutton, setChangeButton ] = useState(false);
    const [ listlt, setListLT ] = useState(false);
    const params = useParams();
    const [ state, setState ] = useState({
        toFrontpage: false,
    });
    // redux state
    console.log(props)
    const { photosList } = props.theme;
    const [ notiList, setNotiList ] = useState()
    useEffect(() => {
        const notiRef = myFirebase.database().ref('notifications/' + params.id).orderByChild('boardId').equalTo(params.id);
        notiRef.on('value', snapshot => {
            const notis = snapshot.val();
            const notiList = []
            for (let id in notis) {
                notiList.push(notis[ id ])
            }
            console.log(notiList);
            setNotiList(notiList);
        })
    }, [])


    // passed props
    const { showBoardMenu, toggleMenu, updateBoardArchive } = props;

    const list = [ { name: 'dsdsdfffffffffffffffffffffffffffffffffffffffffffffffffffff' } ]

    const list1 = [ { name: 'eqwewefffffffffffffffffffffggggggggggggffff' }, { name: 'grghehr' }, { name: 'eqwewe' }, { name: 'grghehr' }, { name: 'eqwewe' }, { name: 'grghehr' } ]


    const colorsList = [
        'rgb(0, 121, 191)',
        'rgb(210, 144, 52)',
        'rgb(81, 152, 57)',
        'rgb(176, 70, 50)',
        'rgb(137, 96, 158)',
        'rgb(205, 90, 145)',
        'rgb(75, 191, 107)',
        'rgb(0, 174, 204)'
    ];

    // hide/show the menu section where you pick either background or photo
    const toggleBackground = () => {
        if (changeBackgroundColor && changeBackground) {
            setChangeBackgroundColor(!changeBackgroundColor);
        }
        else if (changePhoto && changeBackground) {
            setChangePhoto(!changePhoto);
        }
        else {
            setChangeBackground(!changeBackground);
        }
    }

    const changebuttons = () => {
        setChangeButton(!changebutton)
        setListLT(!listlt)
    }

    const toggleBackground1 = () => {
        if (changeBackgroundColor1 && changeBackground1) {
            setChangeBackgroundColor1(!changeBackgroundColor1);
        }
        else if (changePhoto1 && changeBackground1) {
            setChangePhoto1(!changePhoto1);
        }
        else {
            setChangeBackground1(!changeBackground1);
        }
    }

    // hide/show the color picker menu section
    const toggleBackgroundColor = () => {
        setChangeBackgroundColor(!changeBackgroundColor);
    }

    // hide/show the photo picker menu section
    const togglePhotos = () => {
        setChangePhoto(!changePhoto);
    }
    const handleArchiveSubmit = () => {
        const uid = myFirebase.auth().currentUser.uid
        myFirebase.database().ref('/boards/' + params.id + '/members/').once('value', function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (data) {
                    myFirebase.database().ref('/userBoards/' + data.val().uid).child(params.id).remove();
                })
            }
        }).then(() => {
            myFirebase.database().ref('/notifications/inviteNoti').orderByChild('boardId').equalTo(params.id).on('child_added', function (snapshot) {
                if (snapshot.val().userId == uid) {
                    snapshot.ref.remove()
                }
            })
            // remove from '/boards/'
            myFirebase.database().ref('/boards/' + params.id).remove();
            // remove from '/board/'
            myFirebase.database().ref('/board/' + params.id).remove().then(() => {

            });
            setState({ toFrontpage: true });
        });
    }
    const handleExitBoard = () => {
        const uid = myFirebase.auth().currentUser.uid
        myFirebase.database().ref('/userBoards/' + uid).child(params.id).remove();
        myFirebase.database().ref('/boards/' + params.id + '/members/' + uid).remove()
        myFirebase.database().ref('/notifications/inviteNoti').orderByChild('boardId').equalTo(params.id).on('child_added', function (snapshot) {
            if (snapshot.val().userId == uid) {
                snapshot.ref.remove()
            }
        })
        myFirebase.database().ref('/board/' + params.id + '/members/' + uid).remove().then(() => {
            setState({ toFrontpage: true });
        })

    }
    const selectBackgroundColor = (color) => {
        props.changeBackground(color);
        document.body.style.backgroundColor = color;
        document.body.style.backgroundImage = "";
        toggleBackgroundColor();
    }

    const selectBackgroundPhoto = (url) => {
        document.body.style.backgroundImage = 'url(' + url + ')';
        document.body.style.backgroundColor = "";
    }
    const [ isAdmin, setIsAdmin ] = useState(false);
    useEffect(() => {
        const user = myFirebase.auth().currentUser.uid;
        myFirebase.database().ref('/board/' + params.id + '/members').orderByChild('uid').equalTo(user).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var role = childSnapshot.val().role
                if (role == 'admin') {
                    setIsAdmin(true)
                }
            })
        })
    })
    const redirect = (
        <Redirect to="/" />
    );
    if (state.toFrontpage) {
        return redirect;
    }
    return (
        <MenuWrapper showBoardMenu={ showBoardMenu }>
            <Menu>
                <MenuItems>
                    { changeBackground ? <Title>Đổi hình nền</Title> : <Title>Menu</Title> }
                    { changeBackground ? <MenuArrow onClick={ toggleBackground }><FontAwesomeIcon icon={ faAngleLeft } /></MenuArrow> : null }
                    <CloseMenu onClick={ toggleMenu }><FontAwesomeIcon icon={ faTimes } /></CloseMenu>
                </MenuItems>
                <BackgroundMenu changeBackground={ changeBackground }>
                    <PhotoTile onClick={ toggleBackgroundColor } url={ 'https://a.trellocdn.com/prgb/dist/images/colors@2x.864f4df15d825e89e199.jpg' } />
                    <PhotoTile onClick={ togglePhotos } url={ 'https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.48948499e309aef794d7.jpg' } />
                </BackgroundMenu>
                <BackgroundMenu changeBackground={ changeBackground1 }>
                    <Grid container>
                        <Grid item md={ 6 }>
                            <TextField
                                variant="outlined"
                                placeholder="Tìm Kiếm Lưu Trữ"
                            >

                            </TextField>
                        </Grid>
                        <Grid item md={ 5 } style={ {} } onClick={ changebuttons }>
                            <Button style={ { fontSize: 12, marginLeft: 5, backgroundColor: 'rgb(234 236 240)', borderRadius: 5 } }>
                                { changebutton ? 'Danh Sách đã lưu trữ' : 'Danh Sách Thẻ Đã Lưu Trữ' }
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Listlts listlt={ listlt } style={ { display: listlt === true ? '' : 'none' } }>
                            { list.length !== 0 ? list.map((object, index) => (
                                <Grid container >
                                    <div style={ { width: '80%' } } >
                                        <Grid item md={ 12 } key={ index } style={ { "marginBottom": "25px", "marginLeft": "25px", "marginTop": "10px", cursor: 'pointer', } }>
                                            <Grid container style={ { "backgroundColor": "#fff", "borderRadius": "3px", "boxShadow": "0 1px 0 rgba(9,30,66,.25)", "marginBottom": "8px", "position": "relative", "textDecoration": "none", "zIndex": "0", "padding": "10px 10px 4px 10px" } }>
                                                <Grid item md={ 12 } style={ { wordWrap: 'break-word' } }>
                                                    { object.name }
                                                </Grid>
                                                <Grid item md={ 6 } style={ { marginTop: 8 } }>
                                                    <Grid container>
                                                        <Grid item md={ 1 }>
                                                            <ListAltIcon style={ { padding: 2 } } />
                                                        </Grid>
                                                        <Grid style={ { marginLeft: 15 } }>
                                                            Đã lưu trữ
                                                    </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item md={ 6 }>
                                                    <div style={ { textDecoration: 'underline' } }>
                                                        hoàn trả vào bảng
                                                    </div>
                                                </Grid>
                                                { ' - ' }
                                                <Grid item md={ 1 }>
                                                    <div style={ { textDecoration: 'underline' } }>Xóa</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            )) : <Listlts1>Không có thẻ nào</Listlts1> }
                        </Listlts>
                        <ListlT listlt={ !listlt }>
                            { list1.length !== 0 ? list1.map((object, index) => (
                                <div>
                                    <Grid container style={ { "marginBottom": "10px", "marginTop": "10px" } }>
                                        <Grid item md={ 6 } style={ { wordBreak: 'break-word' } }>
                                            { object.name }
                                        </Grid>
                                        <Grid item md={ 6 }>
                                            <Grid container>
                                                <Grid item md={ 12 } >
                                                    <Button style={ { "marginLeft": "4px", "fontSize": "8px", "width": "80%", backgroundColor: 'rgb(234 236 240)', } }>
                                                        <ReplayIcon />
                                                        Hoàn trả vào bảng
                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <hr />
                                </div>
                            )) : <Listlts1>Không có thẻ nào</Listlts1> }
                        </ListlT>
                    </Grid>
                </BackgroundMenu>
                <PhotoMenu changePhoto={ changePhoto }>
                    <Search />
                    <SearchIcon><FontAwesomeIcon icon={ faSearch } /></SearchIcon>
                    {
                        photosList.map((object, index) => (
                            <PhotoTile key={ index } url={ object.urls.thumb } onClick={ () => selectBackgroundPhoto(object.urls.full) } />
                        ))
                    }
                </PhotoMenu>
                <BackgroundColorMenu changeBackgroundColor={ changeBackgroundColor }>
                    {
                        colorsList.map((color, index) => (
                            <BackgroundTile color={ color } onClick={ () => selectBackgroundColor(color) } key={ index } />
                        ))
                    }
                </BackgroundColorMenu>
                <MenuItems>
                    <OptionsList>
                        <OptionsItem onClick={ toggleBackground }>
                            <Icon><FontAwesomeIcon icon={ faPaintBrush } /></Icon>
                                Đổi hình nền
                        </OptionsItem>
                        <OptionsItem>
                            <Icon><FontAwesomeIcon icon={ faSearch } /></Icon>
                                Tìm thẻ
                            </OptionsItem>
                        <OptionsItem>
                            <Icon><FontAwesomeIcon icon={ faEllipsisH } /></Icon>
                                More
                            </OptionsItem>
                        <OptionsItem onClick={ toggleBackground1 }>
                            <Icon><FontAwesomeIcon icon={ faEllipsisH } /></Icon>
                                Kho lưu trữ
                            </OptionsItem>
                        <OptionsItem onClick={ handleExitBoard }>
                            <Icon><FontAwesomeIcon icon={ faSignOutAlt } /></Icon>
                                Thoát board
                            </OptionsItem>
                        { isAdmin ? <OptionsItem onClick={ handleArchiveSubmit }>
                            <Icon><FontAwesomeIcon icon={ faTrash } /></Icon>
                                Đóng board
                            </OptionsItem> : null }
                    </OptionsList>
                </MenuItems>
                <MenuItems>
                    <OptionsList>
                        <OptionsItem>
                            <Icon><FontAwesomeIcon icon={ faTasks } /></Icon>Hoạt động
                        </OptionsItem>
                    </OptionsList>
                    { notiList ? notiList.map((noti, i) =>
                        <li key={ i }>{ noti.content }</li>
                    ) : '' }
                </MenuItems>
            </Menu>
        </MenuWrapper>
    )

}

function Search() {
    const [ searchTerm, setSearchTerm ] = useState('forest');
    const [ loading, setLoading ] = useState(false);
    const dispatch = useDispatch();

    // called every time searchTerm is changed 
    useEffect(() => {
        setLoading(true);
        const delayDebounceFn = setTimeout(() => {
            //gets executed after 700ms
            dispatch(getPhotosList(searchTerm));
            setLoading(false);
        }, 700)

        // delays delayDebounceFn from being executed by clearing timer
        return () => clearTimeout(delayDebounceFn)
    }, [ searchTerm, dispatch ])

    return (
        <Fragment>
            <SearchPhotos
                placeholder='Photos'
                onChange={ (e) => setSearchTerm(e.target.value) }
            />
            {
                loading && <Loader />
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, { changeBackground, getPhotosList })(BoardMenu);