import { Button, Checkbox, createStyles, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { myFirebase } from "../../firebase/firebase";
import { useForm } from "react-hook-form";
import * as moment from 'moment';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

export default function DayDeadLine({ boardId, indexCard, indexList }) {
    const classes = useStyles();

    const [todoList, setTodoList] = useState();
    const [dayTime, setDayTime] = useState("");
    const { reset } = useForm({});

    useEffect(() => {
        const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard);
        todoRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            for (let id in todos) {
                todoList.push({ id, ...todos[id] });
            }
            setTodoList(todoList);
            // console.log("todoList", todoList)
            var data = [];
            for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].id === "dayTime") {
                    data = todoList[i]
                }
            }

            var b = Object.entries(data).length - 1
            var a = Object.entries(data).slice(0, b).map(entry => entry[1]);
            var dayTime = a.join('')
            setDayTime(dayTime)
            reset(dayTime);

        });
    }, [reset]);

    const editDayTime = () => {
        const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard);
        todoRef.update({
            dayTime,
        });
    };
    const handleOnChange = (e) => {
        setDayTime(e.target.value);
        // console.log("setDayTime", setDayTime)
    };


    var now = new Date();
    // var xmasDay = new Date(now.getFullYear(), 11, 24); // khởi tạo ngày Noel cùng năm với ngày hiện tại
    // var xmasDay = moment(dayTime).format('YYYY-MM-DDTHH:mm:ss.sssZ');


    // var offset = xmasDay.getTime() - now.getTime(); // lấy độ lệch của 2 mốc thời gian, đơn vị tính là millisecond

    // var days = Math.floor(offset / 1000 / 60 / 60 / 24);

    // offset -= days * 1000 * 60 * 60 * 24; // giảm offset đi
    // var hours = Math.floor(offset / 1000 / 60 / 60);

    // offset -= hours * 1000 * 60 * 60; // giảm offset đi
    // var minutes = Math.floor(offset / 1000 / 60);

    // offset -= minutes * 1000 * 60;
    // var seconds = Math.floor(offset / 1000);

    // alert("Còn " + days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây là đến Noel");

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Grid container>
                    <Grid item md={1} >
                        <EventBusyIcon />
                    </Grid>
                    <Grid item md={11} >
                        <h3 style={{ "color": "#5e6c84", "fontSize": "12px", "fontWeight": "500", "letterSpacing": ".04em", "lineHeight": "20px", "marginTop": "16px", "textTransform": "uppercase", "display": "block", "margin": "0 8px 4px 0", "whiteSpace": "nowrap", "textOverflow": "ellipsis", "overflow": "hidden" }}>Ngày Hết Hạn</h3>
                        <Grid container>
                            <TextField
                                onBlur={editDayTime}
                                onChange={handleOnChange}
                                type="datetime-local"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid container>
                            {console.log("dayTime", moment(dayTime).format('YYYY-MM-DDTHH:mm:ss.sssZ'))}
                        </Grid>
                        <Grid container>
                            <Grid item md={1}>
                                <Checkbox />
                            </Grid>
                            <Grid item md={11}>

                                <Button>
                                    <span>{dayTime}</span>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
