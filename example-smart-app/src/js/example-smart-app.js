(function(window){
  window.extractData = function() {
    let response = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      response.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        let patient = smart.patient;
        let patientData = patient.read();


        $.when(patientData).fail(onError);

        $.when(patientData).done(function(patient) {
          let gender = patient.gender;

          let fname = '';
          let lname = '';

          if (typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given.join(' ');
            lname = patient.name[0].family.join(' ');
          }

          let patientdetails = defaultPatient();
          patientdetails.birthdate = patient.birthDate;
          patientdetails.gender = gender;
          patientdetails.fname = fname;
          patientdetails.lname = lname;


          response.resolve(p);
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return response.promise();

  };

  function defaultPatient(){
    return {
      fname: {value: ''},
      lname: {value: ''},
      gender: {value: ''},
      birthdate: {value: ''},
    };
  }




  window.showPatientData = function(patientdetails) {
    $('#holder').show();
    $('#loading').hide();
    $('#fname').html(patientdetails.fname);
    $('#lname').html(patientdetails.lname);
    $('#gender').html(patientdetails.gender);
    $('#birthdate').html(patientdetails.birthdate);
  };

})(window);
