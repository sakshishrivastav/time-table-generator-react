import React, { useState } from "react";
import { useForm } from "./utils/useForm";
import { number, string } from "yup";
import generateSchedule from "./utils/generateSchedule";

function App() {
  const {
    formData: form1,
    handleField: setForm1,
    checkValidationError: checkValidation1,
  } = useForm({
    workingDays: null,
    workingHours: null,
    totalSubject: null,
    subjectPerDay: null,
  });

  const [subjects, setSubjects] = useState([]);
  const [steps, setSteps] = useState([true, false, false]);
  const [schedule, setSchedule] = useState([]);

  const handleSubjectUpdate = (e, i) => {
    const copiedValues = [...subjects];
    if (!copiedValues[i]) {
      copiedValues[i] = {
        subject: { value: "", error: "" },
        hours: { value: "", error: "Required" },
      };
    }
    copiedValues[i].subject.value = e.target.value;
    try {
      string().required().min(3).validateSync(e.target.value);
      copiedValues[i].subject.error = "";
    } catch (error) {
      copiedValues[i].subject.error = error.message;
    }
    setSubjects(copiedValues);
  };

  const handleSubjectHour = (e, i) => {
    const copiedValues = [...subjects];
    if (!copiedValues[i]) {
      copiedValues[i] = {
        subject: { value: "", error: "Required" },
        hours: { value: "", error: "" },
      };
    }
    copiedValues[i].hours.value = e.target.value;
    try {
      number()
        .typeError("Value must be a number")
        .required()
        .positive()
        .integer()
        .min(1)
        .validateSync(e.target.value);
      copiedValues[i].hours.error = "";
    } catch (error) {
      copiedValues[i].hours.error = error.message;
    }
    setSubjects(copiedValues);
  };

  let error = "";
  let validstep2 = false;
  const checkSubjectsValidity = (subjects, total, totalSubject) => {
    let totalHours = 0;
    let isvalid = subjects.every((x) => {
      totalHours = totalHours + parseInt(x?.hours.value);
      if (
        x?.hours.error === "" &&
        x?.subject.error === "" &&
        subjects.length === totalSubject
      ) {
        return true;
      }
      return false;
    });
    if (totalHours !== total) {
      isvalid = false;
      error = "Total hours is not " + total;
    }

    return isvalid;
  };
  if (steps[1]) {
    validstep2 = checkSubjectsValidity(
      subjects,
      form1?.workingDays?.value * form1?.workingHours?.value,
      +form1.totalSubject.value
    );
  }

  const next = function () {
    setSubjects([]);
    setSteps([false, true, false]);
  };

  const _stepThree = () => {
    setSteps([false, false, true]);
    console.log(form1);
    const info = {
      workingDays: form1.workingDays.value,
      totalHours: form1.workingDays.value * form1.workingHours.value,
      perDay: form1.subjectPerDay.value,
    };
    const subjectsInfo = [];
    subjects.forEach((x) => {
      subjectsInfo.push({ name: x.subject.value, hours: x.hours.value });
    });
    setSchedule(generateSchedule(info, subjectsInfo));
  };

  // console.log(schedule);

  return (
    <div className="container">
      <div>
        <h1 className="text-center">Time Table Generator</h1>
        <br />
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <h2>Add Basic Details</h2>
          <h6>
            Total Hours:
            {form1.workingDays?.value * form1.workingHours?.value || 0}
          </h6>
        </div>
        <br />
      </div>
      <div>
        {steps[0] ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="workingDays">No of Working days:</label>
              <input
                name="workingDays"
                type="number"
                className={`form-control ${
                  form1.workingDays?.errorMessage === ""
                    ? "is-valid"
                    : "is-invalid"
                }`}
                id="workingDays"
                placeholder="Working Days"
                onChange={(e) =>
                  setForm1(
                    e,
                    number()
                      .typeError("Value must be a number")
                      .required()
                      .positive()
                      .integer()
                      .min(1)
                      .max(7)
                  )
                }
              />
              <div className="invalid-feedback">
                {form1.workingDays?.errorMessage}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="workingsHours">No of Working hours</label>
              <input
                name="workingHours"
                type="number"
                className={`form-control ${
                  form1.workingHours?.errorMessage === ""
                    ? "is-valid"
                    : "is-invalid"
                }`}
                id="workingHours"
                placeholder="Working Hours"
                required
                onChange={(e) =>
                  setForm1(
                    e,
                    number()
                      .typeError("Value must be a number")
                      .required()
                      .positive()
                      .integer()
                      .min(1)
                      .max(10)
                  )
                }
              />
              <div className="invalid-feedback">
                {form1.workingHours?.errorMessage}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="totalSubject">Total Subject</label>
              <input
                name="totalSubject"
                type="number"
                className={`form-control ${
                  form1.totalSubject?.errorMessage === ""
                    ? "is-valid"
                    : "is-invalid"
                }`}
                id="totalSubject"
                placeholder="Total Subject"
                required
                onChange={(e) =>
                  setForm1(
                    e,
                    number()
                      .typeError("Value must be a number")
                      .required()
                      .positive()
                      .integer()
                      .min(1)
                  )
                }
              />
              <div className="invalid-feedback">
                {form1.totalSubject?.errorMessage}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="subjectPerDay">Subject Per Day</label>
              <input
                name="subjectPerDay"
                type="number"
                className={`form-control ${
                  form1.subjectPerDay?.errorMessage === ""
                    ? "is-valid"
                    : "is-invalid"
                }`}
                id="subjectPerDay"
                placeholder="Subject per day"
                required
                onChange={(e) =>
                  setForm1(
                    e,
                    number()
                      .typeError("Value must be a number")
                      .required()
                      .positive()
                      .integer()
                      .min(1)
                      .max(form1.totalSubject.value)
                  )
                }
              />
              <div className="invalid-feedback">
                {form1.subjectPerDay?.errorMessage}
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className={`btn btn-primary ${
                  checkValidation1() ? "" : "disabled"
                }`}
                onClick={next}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
        {steps[1] ? (
          <div>
            {Array.from(
              Array(+form1.totalSubject?.value).keys(),
              (n) => n + 1
            ).map((x, i) => {
              return (
                <div key={"subrow" + x} className="row">
                  <div className="col-md-8 mb-3">
                    <label htmlFor={`subject${i}`}>Subject #{x}</label>
                    <input
                      type="text"
                      className={`form-control ${
                        subjects[i]?.subject?.error === ""
                          ? "is-valid"
                          : "is-invalid"
                      }`}
                      id={`subject${i}`}
                      required
                      onChange={(e) => handleSubjectUpdate(e, i)}
                    />
                    <div className="invalid-feedback">
                      {subjects[i]?.subject?.error}
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`subjectHour${i}`}>Total Hours</label>
                    <input
                      type="text"
                      className={`form-control ${
                        subjects[i]?.hours?.error === ""
                          ? "is-valid"
                          : "is-invalid"
                      }`}
                      id={`subjectHour${i}`}
                      required
                      onChange={(e) => handleSubjectHour(e, i)}
                    />
                    <div className="invalid-feedback">
                      {subjects[i]?.hours?.error}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="text-danger">{error.length ? error : null}</div>
            <button
              className={`btn btn-primary ${validstep2 ? "" : "disabled"}`}
              onClick={_stepThree}
            >
              Generate Time Table
            </button>
          </div>
        ) : null}
      </div>

      {steps[2] ? (
        <div className="card bd-timetable">
          <h4 className="text-center">Time Table</h4>
          <br />
          <br />
          <div className="table-responsive">
            {typeof schedule !== "string" ? (
              <table className="table table-bordered border-primary table-hover">
                <thead>
                  <tr>
                    {Array.from(
                      Array(+form1.workingDays.value).keys(),
                      (n) => n + 1
                    ).map((x, i) => (
                      <th key={"th" + i} scope="col">
                        Day #{x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, i) => (
                    <tr key={"td" + i}>
                      {row.map((day) => (
                        <td>
                          {day.name} - {day.hours}Hours
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-danger text-center">
                <em><strong>{schedule}</strong></em><br /><br />
                <button onClick={()=>window.location.reload()} className="btn btn-primary">Recalculate</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
