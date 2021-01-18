import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "./styles";
import { Grid, TextField, Typography, withStyles } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
class profile extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.root }>
                <Grid container className={ classes.containerall }>
                    <Grid item md={ 12 }>
                        <Typography className={ classes.header }>
                            Quản lý thông tin cá nhân của bạn
</Typography>
                    </Grid>
                    <Grid item md={ 12 } className={ classes.headerbot }>
                        <Typography className={ classes.header1 }>
                            Đây là nơi bạn có thể thay đổi thông tin hồ sơ của mình và tìm hiểu những gì người dùng và các Power-Ups khác sẽ có thể thấy. Để tìm hiểu thêm, hãy xem Điều khoản dịch vụ hoặc Chính sách Riêng tư của chúng tôi.
</Typography>
                    </Grid>
                    <Grid item md={ 12 } style={ { "width": "100%" } }>
                        <Typography className={ classes.header2 }>
                            Về chúng tôi
</Typography>
                        <hr style={ { "border": "1px solid black" } } />
                    </Grid>
                    <Grid item md={ 12 } style={ { width: '100%' } }>
                        <Grid container>
                            <Grid item md={ 8 } style={ { width: '60%' } }>
                                <div>
                                    <Grid container >
                                        <Grid item md={ 8 } style={ { width: "50%" } }>
                                            Tên đầy đủ
                                    </Grid>
                                        <Grid item md={ 4 } style={ { width: "50%" } }>
                                            <Grid container>
                                                <Grid item md={ 22 }>
                                                    <PublicIcon />
                                                </Grid>
                                                <Grid item md={ 10 } style={ { fontSize: 12, marginTop: 5 } }>
                                                    luôn luôn Công Khai
</Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item md={ 12 } style={ { width: "100%" } }>
                                        <TextField
                                            style={ { "borderRadius": "10px", "backgroundColor": "#e6e6e6" } }
                                            value="mai ngọc dương"
                                            variant="outlined"
                                            multiline
                                            fullWidth
                                            className={ classes.input }
                                        >

                                        </TextField>
                                    </Grid>
                                </div>
                                <div>
                                    <Grid container >
                                        <Grid item md={ 8 } style={ { width: "50%" } }>
                                            Tên đầy đủ
                                    </Grid>
                                        <Grid item md={ 4 } style={ { width: "50%" } }>
                                            <Grid container>
                                                <Grid item md={ 22 }>
                                                    <PublicIcon />
                                                </Grid>
                                                <Grid item md={ 10 } style={ { fontSize: 12, marginTop: 5 } }>
                                                    Luôn Luôn Công Khai
</Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item md={ 12 } style={ { width: "100%" } }>
                                        <TextField
                                            style={ { "borderRadius": "10px", "backgroundColor": "#e6e6e6" } }
                                            value="mai ngọc dương"
                                            variant="outlined"
                                            multiline
                                            fullWidth
                                            className={ classes.input }
                                        >

                                        </TextField>
                                    </Grid>
                                </div>
                                <div>
                                    <Grid container >
                                        <Grid item md={ 8 } style={ { width: "50%" } }>
                                            Tên đầy đủ
                                    </Grid>
                                        <Grid item md={ 4 } style={ { width: "50%" } }>
                                            <Grid container>
                                                <Grid item md={ 22 }>
                                                    <PublicIcon />
                                                </Grid>
                                                <Grid item md={ 10 } style={ { fontSize: 12, marginTop: 5 } }>
                                                    Luôn Luôn Công Khai
</Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item md={ 12 } style={ { width: "100%" } }>
                                        <TextField
                                            style={ { "borderRadius": "10px", "backgroundColor": "#e6e6e6" } }
                                            value="mai ngọc dương"
                                            variant="outlined"
                                            multiline
                                            fullWidth
                                            className={ classes.input }
                                        >

                                        </TextField>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item md={ 4 } style={ { width: '40%' } }>
                                <Grid container>
                                    <Grid item md={ 12 } style={ { width: '100%', textAlign: 'center' } }>
                                        Hình đại diện
                                </Grid>
                                    <Grid item md={ 12 } style={ { width: '100%' } }>
                                        <div className={ classes.photo }>
                                            MD
                                </div>
                                    </Grid>
                                    <Grid item md={ 12 } style={ { width: '100%', textAlign: 'center' } }>
                                        <Grid container>
                                            <Grid item md={ 3 }>
                                                <PublicIcon style={ { float: 'right' } } />
                                            </Grid>
                                            <Grid item md={ 7 } style={ { fontSize: 12, marginTop: 5, width: '80%' } }>
                                                Luôn Luôn Công Khai
</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

profile.propTypes = {

};

export default withStyles(styles)(profile);