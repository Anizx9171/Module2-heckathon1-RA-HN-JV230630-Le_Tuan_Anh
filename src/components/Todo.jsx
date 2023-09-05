import React, { useEffect, useRef, useState } from "react";
let idGlob = null;
export default function Todo() {
  const [job, setJobs] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const [edit, setEdit] = useState(0);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const deleteJob = (id) => {
    if (confirm("Bạn muốn xóa công việc này?")) {
      let newJobList = jobs.filter((jb) => jb.id != id);
      localStorage.setItem("jobs", JSON.stringify(newJobList));
      setJobs(newJobList);
      idGlob = null;
      setEdit(0);
    }
  };
  const addNewJob = () => {
    if (idGlob != null) {
      jobs[idGlob].title = value;
      localStorage.setItem("jobs", JSON.stringify(jobs));
      idGlob = null;
      setValue("");
      setJobs(jobs);
      setEdit(0);
      return;
    }
    if (value == "") {
      return;
    }
    let newJob = {
      id: Math.round(Math.random() * 8999999) + 1000000,
      title: value,
      completed: false,
    };
    setValue("");
    setJobs([...jobs, newJob]);
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
  };
  const handelCheck = (e) => {
    let jobIndex = jobs.findIndex((element) => element.id == e);
    jobs[jobIndex].completed = !jobs[jobIndex].completed;
    localStorage.setItem("jobs", JSON.stringify(jobs));
    setJobs(jobs);
  };
  const editJob = (id) => {
    if (confirm("Bạn muốn sửa công việc này?")) {
      inputRef.current.focus();
      let jobIndex = jobs.findIndex((element) => element.id == id);
      if (jobIndex > -1) {
        setValue(jobs[jobIndex].title);
        idGlob = jobIndex;
      }
      setEdit(1);
    }
  };
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div
            className="row d-flex justify-content-center align-items-center
              h-100"
          >
            <div className="col col-xl-10">
              <div
                className="card"
                style={{
                  background: "#FF5555",
                  boxShadow: "-12px -10px 3px 0px #3333334d",
                }}
              >
                <div className="card-body p-5">
                  <h1 style={{ textAlign: "left" }}>TODO LIST</h1>
                  <p>Get things done, one item at a time</p>
                  <hr style={{ marginBottom: "40px" }} />
                  <div className="tab-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {jobs.map((e, i) => (
                          <li
                            title={
                              e.completed ? "Đã hoàn thành" : "Chưa hoàn thành"
                            }
                            key={i}
                            className="list-group-item d-flex
                                          align-items-center border-0 mb-2
                                          justify-content-between"
                          >
                            <div>
                              <span
                                style={
                                  e.completed
                                    ? {
                                        textDecoration: "line-through",
                                        filter: "brightness(80%)",
                                      }
                                    : { textDecoration: "none" }
                                }
                              >
                                {e.title}
                              </span>
                            </div>
                            <div>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={e.completed}
                                onChange={() => handelCheck(e.id)}
                                style={{
                                  background: "#ff7070",
                                  border: "1px solid #fff",
                                }}
                              />{" "}
                              <a
                                href="#!"
                                className="text-info"
                                title="Sửa công việc"
                              >
                                <i
                                  className="fas fa-pencil-alt me-3"
                                  onClick={() => editJob(e.id)}
                                />
                              </a>
                              <a
                                href="#!"
                                className="text-danger"
                                title="Xóa công việc"
                              >
                                <i
                                  className="fas fa-trash-alt"
                                  onClick={() => deleteJob(e.id)}
                                />
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <label htmlFor="form2">Add to the todo list</label>
                  <form
                    className="d-flex justify-content-center
                              align-items-center mb-4"
                  >
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form2"
                        className="form-control"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        ref={inputRef}
                        style={{ background: "#fff", borderRadius: "0" }}
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={addNewJob}
                      className="btn btn-outline-light m-2"
                      style={{ borderRadius: "0" }}
                    >
                      {edit == 0 ? "Thêm" : "Sửa"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
