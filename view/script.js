
function toggleBookingForm(slotId) {
  var formId = slotId + "-form";
  var form = document.getElementById(formId);
  if (form.style.display === 'none') {
      form.style.display = 'block';
  } else {
      form.style.display = 'none';
  }
}

window.addEventListener('load', function() {
  getMeetings();
});

function bookMeeting(slotId) {
  var name = document.getElementById(`name-${slotId}`).value;
  var email = document.getElementById(`email-${slotId}`).value;
  var time  = document.getElementById(`time-${slotId}`).value;
  // Example payload for sending data to the backend
  var data = {
      name: name,
      email: email,
      slotId: slotId,
      time:time
  };
  console.log(data);
 
  // Example POST request using Axios to book a meeting
  axios.post("http://localhost:3000/add-meeting", data)
  .then(response => {
      // Handle successful response from backend
      console.log('Meeting booked successfully:', response.data);
        var formId = slotId + "-form";
        var form = document.getElementById(formId);
        form.style.display = 'none';
    getMeetings();
    updateAvailableSlots(response.data)

  })
  .catch(error => {
      // Handle error from backend
      console.error('Error:', error);
      // You can display an error message to the user or perform other actions
  });
}

function getMeetings() {
  axios.get("http://localhost:3000/get-meetings")
  .then(response => {
      try {
          // Handle successful response from backend
          console.log('Fetched meetings successfully:', response.data);

          // Display fetched meetings on the page
          updateAvailableSlots(response.data)
          displayMeetings(response.data);
          
      } catch (error) {
          // Handle error from backend
          console.error('Error handling meetings data:', error);
          // You can display an error message to the user or perform other actions
      }
  })
  .catch(error => {
      // Handle error from backend
      console.error('Error fetching meetings:', error);
      // You can display an error message to the user or perform other actions
  });
}

function displayMeetings(meetings) {
  // Get the element where you want to display the meetings
  var meetingsContainer = document.getElementById('meetings-container');

  // Clear any existing content in the container
  meetingsContainer.innerHTML = '';

  try {
      // Loop through the fetched meetings and create HTML elements to display them
      meetings.forEach(meeting => {
          var meetingElement = document.createElement('div');
          meetingElement.classList.add('meeting');
          meetingElement.innerHTML = `
              <h3>Hi ${meeting.name}</h3>
              <p>Please join the meeting via this ${meeting.link} at ${meeting.time} P.M.</p>
              <button type="button" onClick="deleteMeeting('${meeting.id}')">Cancel</button>
              <hr>
          `;
          meetingsContainer.appendChild(meetingElement);
      });
  } catch (error) {
      // Handle error in displaying meetings
      console.error('Error displaying meetings:', error);
      // You can display an error message to the user or perform other actions
  }
}

function deleteMeeting(meetingId) {
  axios.delete(`http://localhost:3000/delete-meeting/${meetingId}`)
  .then(response => {
      // Handle successful response from backend
      console.log('Meeting deleted successfully:', response.data);
      window.location.reload();
  })
  .catch(error => {
      // Handle error from backend
      console.error('Error deleting meeting:', error);
      // You can display an error message to the user or perform other actions
  });
}

let availableSlots2PM = 4;
let availableSlots230PM = 4;
let availableSlots3PM = 4;
let availableSlots330PM = 4;

function updateAvailableSlots(meetings) {
    // Loop through the fetched meetings and update available slots for each time slot
    meetings.forEach(meeting => {
        const slotId = meeting.slotId;
        switch(slotId) {
            case 'slot1':
                availableSlots2PM--;
                break;
            case 'slot2':
                availableSlots230PM--;
                break;
            case 'slot3':
                availableSlots3PM--;
                break;
            case 'slot4':
                availableSlots330PM--;
                break;
            default:
                break;
        }
    });
  

    // Update UI to display dynamically calculated available slots for each time slot
    document.getElementById('slot1-available').textContent = availableSlots2PM;
    document.getElementById('slot2-available').textContent = availableSlots230PM;
    document.getElementById('slot3-available').textContent = availableSlots3PM;
    document.getElementById('slot4-available').textContent = availableSlots330PM;
}

