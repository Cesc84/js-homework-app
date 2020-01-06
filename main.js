
document.getElementById('hwInputForm').addEventListener('submit', saveHw);

function saveHw(e) {
  var hwSubject = document.getElementById('subjectInput').value;
  var hwDeadline = document.getElementById('deadlineInput').value;
  var hwDesc = document.getElementById('hwDescInput').value;
  var hwPriority = document.getElementById('hwPriorityInput').value;
  var homeworkId = chance.guid();
  var hwStatus = 'Open';

  // create new homerowk object
  var homework = {
    id: homeworkId,
    subject: hwSubject,
    deadline: hwDeadline,
    description: hwDesc,
    priority: hwPriority,
    status: hwStatus
  }
  // insterting object to local storage
    // retireving data with getItem
  if(localStorage.getItem('homeworks') == null) {
    var homeworks = [];
    homeworks.push(homework);
    // generate the json object converting the array to the json format
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
  } else {
    // if the is data we insert a new object retrieving everything that inspect
    // currently in the localStorage
    var homeworks = JSON.parse(localStorage.getItem('homeworks'));
    homeworks.push(homework);
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
  }
  // reset the input elements
  document.getElementById('hwInputForm').reset();

  fetchHomeworks();

  e.preventDefault();

}

// Change Open Status
function setStatusClosed(id) {
  // retrieve everything from local storage and put it into the homeworks array
  var homeworks = JSON.parse(localStorage.getItem('homeworks'));

  for(var i = 0; i < homeworks.length; i++) {
    if(homeworks[i].id == id) {
      homeworks[i].status = 'Closed';
    }
  }
  // converting the array to the json format
  localStorage.setItem('homeworks', JSON.stringify(homeworks));
  // update the output
  fetchHomeworks();
}

// Delete Homework
function deleteHm(id) {
  var homeworks = JSON.parse(localStorage.getItem('homeworks'));

  for(var i = 0; i < homeworks.length; i++) {
    if(homeworks[i].id == id) {
      // remove element from the array
      homeworks.splice(i, 1);
    }
  }

  localStorage.setItem('homeworks', JSON.stringify(homeworks));
  // update the output
  fetchHomeworks();

}

function fetchHomeworks() {
  var homeworks = JSON.parse(localStorage.getItem('homeworks'));
  var hwList = document.getElementById('hwList');

  hwList.innerHTML = '';

  for (var i = 0; i < homeworks.length; i++) {
    var id = homeworks[i].id;
    var subject = homeworks[i].subject;
    var deadline = homeworks[i].deadline;
    var desc = homeworks[i].description;
    var priority = homeworks[i].priority;
    var status = homeworks[i].status;

    hwList.innerHTML += '<div class="card">'+
                        '<h6>Issue ID: ' + id + '</h6>'+
                        '<span id="status">' + status + '</span>'+
                        '<div class="info-dl"><h4 id="subject">' + subject + '</h4>'+
                        '<h6 id="deadline">' + deadline + '</h6></div>'+
                        '<p>' + desc + '</p>'+
                        '<h6>' + priority + '</h6>'+
                        '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="button close">Close</a>'+
                        '<a href="#" onclick="deleteHm(\''+id+'\')" class="button delete">Delete</a>'+
                        '</div>';
  }
changeBg();
  // localStorage.clear();
}

function changeBg() {
  var homeworks = JSON.parse(localStorage.getItem('homeworks'));
  var card = document.getElementsByClassName('card');


  for (var i = 0; i < homeworks.length; i++) {
    var subject = homeworks[i].subject;
    switch (subject) {
      case "Geo":
        card[i].style.backgroundImage = "url('../assets/img/geo.jpg')";
        break;
      case "Math":
        card[i].style.backgroundImage = "url('../assets/img/math.jpg')";
        break;
    }
  }
}
