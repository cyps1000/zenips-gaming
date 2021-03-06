// Dependencies
import React from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Actions
import {
  logoutUser,
  clearErrors,
  getUserInfo
} from "../../../actions/authActions";
// Components
import PrivateRoute from "../../Common/PrivateRoute";
import NotFound from "../../Common/NotFound";
// Navigation
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
// Posts
import Posts from "../../Private/Main/Posts";
import PostNew from "../../Private/Main/Posts/js/PostNew";
import PostEdit from "../../Private/Main/Posts/js/PostEdit";
// Patch Notes
import PatchNotes from "../../Private/Main/PatchNotes";
import PatchNotesNew from "../../Private/Main/PatchNotes/js/PatchNotesNew";
import PatchNotesEdit from "../../Private/Main/PatchNotes/js/PatchNotesEdit";
// Team
import Team from "../../Private/Main/Team";
import UserProfile from "../../Private/Main/Team/js/UserProfile";
import ResetPassword from "../../Private/Main/Team/js/Private/ResetPassword";
// Articles
import Articles from "../../Private/Main/Articles";
import ArticlesNew from "../../Private/Main/Articles/js/Operations/ArticlesNew";
import ArticlesEdit from "../../Private/Main/Articles/js/Operations/ArticlesEdit";
import ArticleDedicated from "../../Private/Main/Articles/js/Operations/ArticleDedicated";
import ArticlesSearch from "../../Private/Main/Articles/js/Search/ArticlesSearch";
// Tags
import Tags from "../../Private/Main/Tags";
// Videos
import Videos from "../../Private/Main/Videos";
// Settings
import About from "../../Private/Main/Settings/js/About/About";
import AboutEdit from "../../Private/Main/Settings/js/About/AboutEdit";
import Privacy from "../../Private/Main/Settings/js/Privacy/Privacy";
import PrivacyEdit from "../../Private/Main/Settings/js/Privacy/PrivacyEdit";
import Cookies from "../../Private/Main/Settings/js/Cookies/Cookies";
import CookiesEdit from "../../Private/Main/Settings/js/Cookies/CookiesEdit";
import Terms from "../../Private/Main/Settings/js/Terms/Terms";
import TermsEdit from "../../Private/Main/Settings/js/Terms/TermsEdit";
// Messages
import Inbox from "../../Private/Main/Messages/Inbox";
import Archive from "../../Private/Main/Messages/Archive";
// Modals
import ModalContainer from "../../Common/Modals/ModalContainer";
import Helmet from "react-helmet";
import Brand from "../../../assets/img/brand_admin.ico";
// CSS
import "mdbreact/dist/css/mdb.css";
import "./PrivateLayout.css";

class PrivateLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: true,
      isOpen: false,
      mobile: false
    };
  }

  componentDidMount() {
    if (window.innerWidth <= 414) {
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });
    }
    this.props.getUserInfo(this.props.auth.user.id);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      return { isAuthenticated: nextProps.auth.isAuthenticated };
    }
    if (nextProps.auth) {
      return { auth: nextProps.auth };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const isAuthenticated = this.props.auth.isAuthenticated;
    if (isAuthenticated !== prevProps.auth.isAuthenticated) {
      this.props.getUserInfo(this.props.auth.user.id);
    }
  }

  onLogoutClick = event => {
    event.preventDefault();
    this.props.logoutUser();
    this.props.clearErrors();
  };

  toggleCollapse = () => {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  };

  toggleSidenav = () => {
    this.setState(prevState => {
      return { showHideSidenav: !prevState.showHideSidenav };
    });
  };

  toggleSidenavMobile = () => {
    if (this.state.mobile === true) {
      this.setState(prevState => {
        return { showHideSidenav: !prevState.showHideSidenav };
      });
    }
  };

  render() {
    const expandContent = this.state.showHideSidenav ? false : true;
    const { user, isAuthenticated } = this.props.auth;
    const status = this.state.showHideSidenav ? "" : "active";
    return (
      <div>
        <Helmet>
          <link rel="shortcut icon" href={Brand} />
        </Helmet>
        <div className="wrapper">
          <Navigation
            user={user}
            isAuthenticated={isAuthenticated}
            status={status}
            onLogoutClick={this.onLogoutClick}
            toggleCollapse={this.toggleCollapse}
            toggleSidenav={this.toggleSidenav}
            toggleSidenavMobile={this.toggleSidenavMobile}
            isOpen={this.state.isOpen}
          />
          <Switch>
            {/* Posts */}
            <PrivateRoute
              exact
              path="/dashboard"
              component={Posts}
              expandContent={expandContent}
            />
            <PrivateRoute
              path="/dashboard/posts/new"
              component={PostNew}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/posts/:id/edit"
              component={PostEdit}
              expandContent={expandContent}
            />
            {/* Patch Notes */}
            <PrivateRoute
              exact
              path="/dashboard/patchnotes"
              component={PatchNotes}
              expandContent={expandContent}
            />
            <PrivateRoute
              path="/dashboard/patchnotes/new"
              component={PatchNotesNew}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/patchnotes/:id/edit"
              component={PatchNotesEdit}
              expandContent={expandContent}
            />
            {/* Team / Profile / Account Operations */}
            <PrivateRoute
              exact
              path="/dashboard/team"
              component={Team}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/team/:username"
              component={UserProfile}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/team/reset/:token"
              component={ResetPassword}
              expandContent={expandContent}
            />
            {/* Articles and Tags */}
            <PrivateRoute
              exact
              path="/dashboard/articles"
              component={Articles}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/articles/results"
              component={ArticlesSearch}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/articles/new"
              component={ArticlesNew}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/articles/:id"
              component={ArticleDedicated}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/articles/:id/edit"
              component={ArticlesEdit}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/tags"
              component={Tags}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/videos"
              component={Videos}
              expandContent={expandContent}
            />
            {/* Messages */}
            <PrivateRoute
              exact
              path="/dashboard/inbox"
              component={Inbox}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/archive"
              component={Archive}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/about"
              component={About}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/about/edit"
              component={AboutEdit}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/privacy"
              component={Privacy}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/privacy/edit"
              component={PrivacyEdit}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/cookies"
              component={Cookies}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/cookies/edit"
              component={CookiesEdit}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/terms"
              component={Terms}
              expandContent={expandContent}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings/terms/edit"
              component={TermsEdit}
              expandContent={expandContent}
            />
            <PrivateRoute component={NotFound} expandContent={expandContent} />
          </Switch>
          <Footer expandContent={expandContent} />
        </div>
        <ModalContainer />
      </div>
    );
  }
}

PrivateLayout.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearErrors, getUserInfo }
)(PrivateLayout);
