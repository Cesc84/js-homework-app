
document.getElementById('hwInputForm').addEventListener('submit', saveHw);

function saveHw(e) {
  var hwDesc = document.getElementById('hwDescInput').value;
  var hwPriority = document.getElementById('hwPriorityInput').value;
  var hwSubject = document.getElementById('subjectInput').value;
  var homeworkId = chance.guid();
  var hwStatus = 'Open';

  // create new homerowk object
  var homework = {
    id: homeworkId,
    description: hwDesc,
    priority: hwPriority,
    subject: hwSubject,
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
    var desc = homeworks[i].description;
    var priority = homeworks[i].priority;
    var subject = homeworks[i].subject;
    var status = homeworks[i].status;

    hwList.innerHTML += '<div class="card">'+
                        '<h6>Issue ID: ' + id + '</h6>'+
                        '<span class="status">' + status + '</span>'+
                        '<h4><span class="icon"></span>' + subject + '</h4>'+
                        '<p>' + desc + '</p>'+
                        '<h6><span class="icon"></span>' + priority + '</h6>'+
                        '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="button close">Close</a>'+
                        '<a href="#" onclick="deleteHm(\''+id+'\')" class="button delete">Delete</a>'+
                        '</div>';
  }
  // localStorage.clear();
}
