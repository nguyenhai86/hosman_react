import React from "react";
import "./Login.scss";
import logoFacebook from "./../../assets/images/facebookIcon.svg";
import logoGoogle from "./../../assets/images/googleIcon.svg";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import { PATH } from "../../routers/path";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
class Login extends React.Component {
  state = {
    isShowPass: false,
  };
  handleShowHidePass = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };
  handleLogin = () => {
    console.log(this.props.errors);
    if (this.props.errors == true) {
      console.log(this.props.errors);
      toast.error("Đăng nhập không thành công");
    } else {
      toast.error("Đã vào login");
      let loginbody = {
        email: this.props.values.email,
        matkhau: this.props.values.password,
      };
      if (this.props.login(loginbody)) {
        toast.success("Đăng nhập thành công");
      }
    }
  };
  render() {
    return (
      <div className="login">
        <h1 className="login__title">ĐĂNG NHẬP</h1>
        <div className="login__grouplogin">
          <Button variant="outlined" color="tertiary">
            <img src={logoFacebook} alt="logo Facebook" />
            <span>Đăng nhập với Facebook</span>
          </Button>
          <Button variant="outlined" color="tertiary">
            <img src={logoGoogle} alt="logo Google" />
            <span>Đăng nhập với Google</span>
          </Button>
        </div>
        <p className="login__text-or">HOẶC</p>
        <form className="login__form">
          <TextField
            fullWidth
            id="email"
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            value={this.props.values.email}
            onChange={this.props.handleChange}></TextField>
          <div className="login__inputpass">
            <TextField
              fullWidth
              id="password"
              name="password"
              variant="outlined"
              label="Password"
              type={this.state.isShowPass ? "text" : "password"}
              value={this.props.values.password}
              onChange={this.props.handleChange}
              error={
                this.props.touched.password &&
                Boolean(this.props.errors.password)
              }
              helperText={
                this.props.touched.password && this.props.errors.password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => this.handleShowHidePass()}>
                      {this.state.isShowPass ? (
                        <i class="fa-regular fa-eye-slash"></i>
                      ) : (
                        <i class="fa-regular fa-eye"></i>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}></TextField>
          </div>
          <Button
            className="login__submit"
            variant="contained"
            onClick={() => this.handleLogin()}>
            ĐĂNG NHẬP
          </Button>
        </form>
        <div className="login__grouplink">
          <span>Bạn chưa có tài khoản ?</span>
          <Link to={PATH.SIGNUP}>Đăng ký</Link>
          <Link to="#">Quên mật khẩu</Link>
        </div>
      </div>
    );
  }
}
const formik = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Định dạng email không đúng")
      .required("Không được để trống"),
    password: Yup.string()
      .min(8, "Password phải có ít nhất 8 ký tự")
      .required("Không được để trống"),
  }),
  handleSubmit: (values) => {
    alert(JSON.stringify(values, null, 2));
  },
})(Login);
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (loginbody) => {
      dispatch(actions.actLoginRequest(loginbody));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formik);
