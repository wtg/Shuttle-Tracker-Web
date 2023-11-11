<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Header></Header>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col" :class="{'text-white': isDarkMode}" style="max-width: 1140px; ">
            <h2>Privacy Policy</h2>
            <h4>Updated November 3, 2023</h4>
            <p> 
              Our Privacy Policy describes how Shuttle Tracker collects and use personal data 
              and what we will and will not do with collected information. Shuttle Tracker is commited to keeping any and all personal information collected 
              of those individuals that visit our website.
            </p>
            <p style="padding-bottom: 3%;"> 
              Shuttle Tracker is developed as a partnership between the Web Technologies Group and the 
              <a href="https://new.rcos.io">Rensselaer Center for Open Source</a> at <a href="https://rpi.edu">
                Rensselaer Polytechnic Institute</a>. You can <a href="mailto:privacy@shuttletracker.app">contact our privacy team</a> with inquiries about this policy and the use of your data.
            </p>
              <button class="collapsible" :class="{'text-white': isDarkMode, 'open': isCollapsibleOpen[0]}" @click="toggleCollapsible(0)">
                Location
                <span class="arrow" :class="{'rotate': isCollapsibleOpen[0]}">▶</span>
              </button>
            
            <div class="content content0" :class="{'show': isCollapsibleOpen[0]}">
            <p>
              Shuttle Tracker sends your location data to our server only when Board Bus is activated and stops sending these data when Board Bus is deactivated. You can activate Board Bus manually by tapping “Board Bus” or automatically by positioning your device within Bluetooth range of a Shuttle Tracker Node device on a bus if you opted in to the Shuttle Tracker Network. You can deactivate Board Bus manually by tapping “Leave Bus” or automatically by positioning your device out of Bluetooth range of a Shuttle Tracker Node device on a bus if you opted in to the Shuttle Tracker Network. Your location data are associated with an anonymous, random identifier that rotates every time you start a new shuttle trip. These data aren’t associated with your name, Apple ID, RCS ID, RIN, or any other information that might identify you or your device. We continuously purge location data that are more than 30 seconds old from our server. We may retain resolved location data that are calculated using a combination of system- and user-reported data indefinitely, but these resolved data don’t correspond with any specific user-reported coordinates. Even if you opt in to the Shuttle Tracker Network, we never track your location unless you manually activate Board Bus or physically board a bus. Your device might alert you to Shuttle Tracker’s location monitoring in the background even when Shuttle Tracker isn’t actually tracking your location. This is due to a system limitation; Shuttle Tracker occasionally scans for Shuttle Tracker Node devices in the  background, and your device might show that activity as location tracking. The results of these scans never leave your device, and we only start collecting location data if a scan indicates that you’re physically on a bus.
            </p>
            </div>
            <button class="collapsible" :class="{'text-white': isDarkMode}" @click="toggleCollapsible(1); calculateAnimationSpeed();">Logging
              <span class="arrow" :class="{'rotate': isCollapsibleOpen[1]}">▶</span>
            </button>
            <div class="content content1" :class="{'show': isCollapsibleOpen[1]}">
            <p>
              Shuttle Tracker automatically detects errors and uploads diagnostic logs to our server when they occur. These logs aren’t associated with your name, Apple ID, RCS ID, RIN, or any other information that might identify you or your device. They contain information about, for example, failed network requests. We redact sensitive information like your location, replacing those data with irreversible hashes. These hashes let us correlate different logs without revealing any of the redacted information. Logs are retained indefinitely; contact us if you want to request that we delete a log from our server. Due to the privacy-preserving nature of how we identify logs, we might not be able to find and to verify the log that you want to delete. You can see a record of recently uploaded logs or disable automatic uploads entirely in <mark :class="{'highlight': isCollapsibleOpen[1]}">Settings > Logging & Analytics</mark>.
            </p>
            </div>
            <button class="collapsible" :class="{'text-white': isDarkMode}" @click="toggleCollapsible(2); calculateAnimationSpeed();">Analytics
              <span class="arrow" :class="{'rotate': isCollapsibleOpen[2]}">▶</span>
            </button>
            <div class="content content2" :class="{'show': isCollapsibleOpen[2]}">
            <p>
              If you opt in to analytics, then Shuttle Tracker will send anonymous usage data to our server. These data include your app settings, feature usage frequency, and other similar metrics. No analytics data are ever collected unless you explicitly opt in. You can see a record of recently uploaded analytics reports or opt-in status in <mark :class="{'highlight': isCollapsibleOpen[2]}">Settings > Logging & Analytics</mark>.
            </p>
            </div>
            <b-button to="/" style="margin-top: 3%;"> Home Page </b-button>
          </div>
        </div>
        <div class="col mt-4" :class="{'text-white': isDarkMode}" style="margin-top: 5%;">
      <Copyright></Copyright>
    </div>
      </div>
    </div>
  </div>
</template>


<script>
import mixin from "../mixins/mixins";
import Header from "../components/Header";
import Copyright from "../components/Copyright";

export default {
  name: "PrivacyPolicy",
  mixins: [mixin],
  components: {
    Header,
    Copyright,
  },
  data() {
    return {
      isCollapsibleOpen: [false, false, false],
    };
  },
  methods: {
    toggleCollapsible(index) {
      this.$set(this.isCollapsibleOpen, index, !this.isCollapsibleOpen[index]);
      this.calculateAnimationSpeed(index);
    },
    calculateAnimationSpeed(index) {
      // Set speed of mark animation to 40 lines per 1 sec
      const contentElement = document.querySelector(".content" + index + ".show p");

      if (contentElement) {
        const length = contentElement.textContent.length;
        const speed = length / 30 / 4 * 0.04;
        const markElement = document.querySelector("mark");
      
        if (markElement) {
          markElement.style.setProperty("--defaultSpeed", speed + "s");
        }
      }
    }
  },
};

</script>

<style scoped>
.collapsible {
  background-color: transparent; 
  cursor: pointer;
  padding: 1px;
  width: 100%;
  border: none;
  border-top: 1px solid;
  padding-top: 9px;
  padding-left: 5px;
  padding-bottom: 10px;
  text-align: left;
  outline: none;
  font-size: 30px;
  transition: background-color 0.5s, color 0.5s;
  position: relative;
}
.arrow {
  font-family: 'Glyphicons Halflings';
  position: absolute;
  right: 10px;
  transition: transform 1s;
}

.rotate {
  -webkit-transform: rotate(90deg);
	-moz-transform: rotate(90deg);
	transform: rotate(90deg);
}
.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s ease-out;
}
.show {
  padding: 0 18px;
  max-height: 500px;
  transition: all 0.5s ease-in;
}

.collapsible:hover {
  background-color: #5555553a;
  width: 100%; 
}

mark {
  background-color: none;
  background: linear-gradient(90deg, #7efff5 50%, rgba(255, 255, 255, 0) 50%);
  background-size: 200% 100%;
  background-position: 0 0;
  -webkit-animation: 0.5s highlightBack 0.1s 1 backwards;
  animation: 0.5s highlightBack 0.1s 1 backwards;
  transition: animation 0.5s;
}
.highlight {
  --defaultSpeed: 0.1s;
  background-position: 100% 0;
  -webkit-animation: 0.5s highlight var(--defaultSpeed) 1 forwards;
  animation: 0.5s highlight var(--defaultSpeed) 1 forwards;
  transition: animation 0.5s;
}
@-webkit-keyframes highlight {
  to {
    background-position: 0 0;
  }
}
@keyframes highlight {
  to {
    background-position: 0 0;
  }
}

@-webkit-keyframes highlightBack {
  to {
    background-position: 100% 0;
  }
}
@keyframes highlightBack {
  to {
    background-position: 100% 0;
  }
}


.custom-bullet::before {
  /* Image width and height can only be adjusted by its original file */ 
  content: url('../../public/map-marker.png'); 
  position: absolute;
  left: -40px;
  top: 2px;
}

</style>