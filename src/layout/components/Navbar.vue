<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <transition name="sidebarLogoFade">
        <router-link key="collapse" class="sidebar-logo-link" to="/">
          <img src="@/assets/images/logo.3673fab5.png" class="sidebar-logo" />
        </router-link>
      </transition>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            src="http://destiny001.gitee.io/image/monkey_02.jpg"
            class="user-avatar"
          />
          <span class="username">欢迎您，{{userInfo.userName}}</span>
          <span class="logout">退出</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  data(){
    return{
      userInfo:{}
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    logout(){
      this.$store.dispatch("user/logout");
      this.$router.push('/login')

    }
  },
  created() {
    
    this.userInfo = this.$store.state.user.userInfo
    console.log(this.userInfo);
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  // padding: 0,15px;
  padding-right: 15px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABwEAAAA8CAYAAACOysV5AAADG0lEQVR4nO3aR04DURBF0bYHhPWxFDbMLggDjIQEIjh0+O2uqn/OEt70vt3D49NhAAAA4Crub/fD3c3O2AAAAKxqb14AAIDreX59H17efDEBAABYlwgIAABwZUIgAAAAaxMBAQAANiAEAgAAsCYREAAAYCNCIAAAAGsRAQEAADYkBAIAALAGERAAAGBjQiAAAACtiYAAAAABCIEAAAC0JAICAAAEIQQCAADQiggIAAAQiBAIAABACyIgAABAMEIgAAAAS4mAAAAAAQmBAAAALCECAgAABCUEAgAAMJcICAAAEJgQCAAAwBwiIAAAQHBCIAAAAFOJgAAAAAkIgQAAAEwhAgIAACQhBAIAADCWCAgAAJCIEAgAAMAYIiAAAEAyQiAAAACXiIAAAAAJCYEAAACcIwICAAAkJQQCAABwiggIAACQmBAIAADAMSIgAABAckIgAAAAf4mAAAAABQiBAAAA/CQCAgAAFCEEAgAA8EUEBAAAKEQIBAAAYBABAQAA6hECAQAAEAEBAAAKEgIBAAD6JgICAAAUJQQCAAD0SwQEAAAoTAgEAADokwgIAABQnBAIAADQHxEQAACgA0IgAABAX0RAAACATgiBAAAA/RABAQAAOiIEAgAA9EEEBAAA6IwQCAAAUJ8ICAAA0CEhEAAAoDYREAAAoFNCIAAAQF0iIAAAQMeEQAAAgJpEQAAAgM4JgQAAAPWIgAAAAAiBAAAAxYiAAAAAfBICAQAA6hABAQAA+CYEAgAA1CACAgAA8IsQCAAAkJ8ICAAAwD9CIAAAQG4iIAAAAEcJgQAAAHmJgAAAAJwkBAIAAOQkAgIAAHCWEAgAAJCPCAgAAMBFQiAAAEAuIiAAAACjCIEAAAB5iIAAAACMJgQCAADkIAICAAAwiRAIAAAQnwgIAADAZEIgAABAbCIgAAAAswiBAAAAcYmAAAAAzCYEAgAAxCQCAgAAsIgQCAAAEI8ICAAAwGJCIAAAQCwiIAAAAE0IgQAAAHGIgAAAADQjBAIAAMQgAgIAANCUEAgAALA9ERAAAIDmhEAAAIANDcPwAWT/XbLChBneAAAAAElFTkSuQmCC);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // margin-bottom: 50px;

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
      width: 32px;
      height: 32px;
    }
  }
  // 大图样式
  .sidebar-logo {
    width: 88px;
    position: fixed;
    left: 15px;
    top: 0;
    // vertical-align: middle;
    margin-right: 15px;
    margin-top: 6px;
    // margin-left: 15px;
  }
  .right-menu {
    vertical-align: middle;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        vertical-align: text-bottom;
        position: relative;
        // margin-top: 5px;
        // 开启flex
        display: flex;
        align-items: center;
        color: #fff;
        .username {
          width: 108px;
          height: 21px;
          // margin: 0, 15px;
          margin-left: 15px;
          margin-bottom: 20px;
        }
        .logout {
          margin-left: 15px;
          // bottom: 10px;;
          margin-top: 8px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          // top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
