const apiKey = "ff110d659fa64f84ada28dfda4cdb5ce";

async function getLocation() {
  const locationInput = document.getElementById("location");
  const mapDiv = document.getElementById("map");

  locationInput.value = "Fetching location...";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const address = data.features[0].properties.formatted;
          locationInput.value = address;

          mapDiv.innerHTML = `
            <iframe
              width="100%"
              height="100%"
              frameborder="0"
              style="border:0"
              src="https://maps.google.com/maps?q=${lat},${lon}&z=16&output=embed"
              allowfullscreen>
            </iframe>
          `;
          
        } else {
          locationInput.value = "Could not find address.";
          mapDiv.innerHTML = "";
        }
        
      } catch (err) {
        console.error("Error fetching address:", err);
        locationInput.value = "Failed to retrieve address.";
        mapDiv.innerHTML = "";
      }

    }, (error) => {
      console.error("Geolocation error:", error.message);
      locationInput.value = "Permission denied or error occurred.";
      mapDiv.innerHTML = "";
    });
  } else {
    locationInput.value = "Geolocation is not supported in your browser.";
    mapDiv.innerHTML = "";
  }
}

function previewImage(event) {
  const file = event.target.files[0];
  const previewDiv = document.getElementById("imagePreview");
  const cancelBtn = document.getElementById("cancelImage");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewDiv.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 200px; border-radius: 10px;" />`;
      cancelBtn.style.display = "inline";
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  const input = document.getElementById("image");
  const previewDiv = document.getElementById("imagePreview");
  const cancelBtn = document.getElementById("cancelImage");

  input.value = "";
  previewDiv.innerHTML = "";
  cancelBtn.style.display = "none";
}

const profileBtn = document.getElementById('profileBtn');
const profileDrawer = document.getElementById('profileDrawer');
const overlay = document.getElementById('overlay');
const closeDrawer = document.getElementById('closeDrawer');

profileBtn.addEventListener('click', () => {
  profileDrawer.classList.add('open');
  overlay.classList.add('show');
});

closeDrawer.addEventListener('click', () => {
  profileDrawer.classList.remove('open');
  overlay.classList.remove('show');
});

overlay.addEventListener('click', () => {
  profileDrawer.classList.remove('open');
  overlay.classList.remove('show');
});
