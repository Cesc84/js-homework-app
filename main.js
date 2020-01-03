
document.getElementById('hwInputForm').addEventListener('submit', saveHw);

function saveHw(e) {
  var hwDesc = document.getElementById('hwDescInput').value;
  var hwPriority = document.getElementById('hwPriorityInput').value;
  var hwSubject = document.getElementById('subjectInput').value;
  var homeworkId = chance.guid();
  var hwStatus = 'Open';

  var homework = {
    id: homeworkId,
    description: hwDesc,
    priority: hwPriority,
    subject: hwSubject,
    status: hwStatus
  }

  if(localStorage.getItem('homeworks') == null) {
    console.log('empty');
    var homeworks = [];
    homeworks.push(homework);
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
  } else {
    console.log('there is data');
    var homeworks = JSON.parse(localStorage.getItem('homeworks'));
    homeworks.push(homework);
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
  }

  document.getElementById('hwInputForm').reset();

  fetchHomeworks();

  e.preventDefault();

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
