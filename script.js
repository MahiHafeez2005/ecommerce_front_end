
   
      function startCountdown() {
        let target = new Date();
        target.setDate(target.getDate() + 4);
        target.setHours(target.getHours() + 13);
        target.setMinutes(target.getMinutes() + 34);
        target.setSeconds(target.getSeconds() + 56);

        function update() {
          let now = new Date();
          let diff = target - now;

          if (diff < 0) {
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
            return;
          }

          let days = Math.floor(diff / (1000 * 60 * 60 * 24));
          let hours = Math.floor((diff % 86400000) / (1000 * 60 * 60));
          let minutes = Math.floor((diff % 3600000) / (1000 * 60));
          let seconds = Math.floor((diff % 60000) / 1000);

          document.getElementById("days").innerHTML = String(days).padStart(
            2,
            "0"
          );
          document.getElementById("hours").innerHTML = String(hours).padStart(
            2,
            "0"
          );
          document.getElementById("minutes").innerHTML = String(
            minutes
          ).padStart(2, "0");
          document.getElementById("seconds").innerHTML = String(
            seconds
          ).padStart(2, "0");
        }

        update();
        setInterval(update, 1000);
      }

      startCountdown();
      console.log("Ecommerce website loaded successfully");
   