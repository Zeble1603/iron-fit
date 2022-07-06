document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("lab-express-basic-auth JS imported successfully!");
  },
  false
);

function searchExerciseByName() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById('exerciseSearch');
	filter = input.value.toUpperCase();
	table = document.getElementById('exercisesTable');
	tr = table.getElementsByTagName('tr');
	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}

const selectBodyPartElement = document.getElementById('selectBodyPart')
selectBodyPartElement.addEventListener('change', (event)=>{
  let table = document.getElementById('exercisesTable');
	let tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++){
    let td = tr[i].getElementsByTagName('td')[1];
    if (td){
      let txtValue = td.textContent || td.innerText;
      //let target = event.target.value.replace(" ", "%20");
      if(txtValue === event.target.value){
        tr[i].style.display = '';
      }else{
				tr[i].style.display = 'none';
			}
    }
  }
})

const selectTargetMuscleElement = document.getElementById('selectTargetMuscle')
selectTargetMuscleElement.addEventListener('change', (event)=>{
  let table = document.getElementById('exercisesTable');
	let tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++){
    let td = tr[i].getElementsByTagName('td')[2];
    if (td){
      let txtValue = td.textContent || td.innerText;
      //let target = event.target.value.replace(" ", "%20");
      if(txtValue === event.target.value){
        tr[i].style.display = '';
      }else{
				tr[i].style.display = 'none';
			}
    }
  }
})

const selectEquipmentElement = document.getElementById('selectEquipment')
selectEquipmentElement.addEventListener('change', (event)=>{
  let table = document.getElementById('exercisesTable');
	let tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++){
    let td = tr[i].getElementsByTagName('td')[3];
    if (td){
      let txtValue = td.textContent || td.innerText;
      //let target = event.target.value.replace(" ", "%20");
      if(txtValue === event.target.value){
        tr[i].style.display = '';
      }else{
				tr[i].style.display = 'none';
			}
    }
  }
})