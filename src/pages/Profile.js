import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";
import { ProfileImage } from "../ProfileImage";

// import { useAlert } from "react-alert";

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  const [isLoading, setLoading] = useState(false);
  var [date, setDate] = useState(new Date());
  const [show5, setShow5] = useState(false);
  const [show7, setShow7] = useState(false);

  // const alert = useAlert();

  // var today = new Date(),
  // date =
  //   date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  useEffect(() => {
    const docRef = firestore.collection("users").doc(params.id);
    setInterval(() => setDate(new Date()), 1000);

    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
        const formData = Object.entries(documentData).map((entry) => ({
          [entry[0]]: entry[1],
        }));

        setValue(formData);
      }
    });
    return unsubscribe;
  }, [user.uid, setValue, params.id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUserDocument({ uid: params.id, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    alert("Submitted..");
  };

  if (!userDocument) {
    return null;
  }

  const formClassname = `ui big form twelve wide column ${
    isLoading ? "loading" : ""
  }`;

  const sh = (e) => {
    if (e.target.value === "V") {
      setShow5(true);
      setShow7(false);
    }
    if (e.target.value === "VII") {
      setShow7(true);
      setShow5(false);
    }
  };

  return (
    <div
      className="add-form-container"
      style={{ maxWidth: 960, margin: "50px auto" }}
    >
      {/* <input
        type="text"
        name="ts"
        readonly
        value={state.myCurrentTime}
        ref={register}
      /> */}

      {/* <div>
        <input type="text" name="ts" readonly value={date} ref={register} />
      </div> */}

      <ul>
        <li>
          Please note that faculy preference for a Course is based on First Come
          First Serve and Vacancy.{" "}
        </li>
        <li>
          In case of muliple submissions, the last submission will be
          considered.
        </li>
      </ul>

      <div>
        <input
          type="text"
          size="24"
          name="ts"
          readonly
          value={date.toDateString() + ", " + date.toLocaleTimeString()}
          ref={register}
        />
      </div>

      {/* <div>
        <input
          type="text"
          name="tm"
          readonly
          value={date.toLocaleTimeString()}
          ref={register}
        />
      </div> */}

      <div className="ui grid stackable">
        <ProfileImage id={params.id} />
        <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
          <div className="fields">
            <div className="eight wide field">
              <label>
                Name
                <input type="text" name="name" required ref={register} />
              </label>
            </div>
            <div className="eight wide field">
              <label>
                Email
                <input type="text" name="email" disabled ref={register} />
              </label>
            </div>
          </div>
          {/* <div className="fields">
            <div className="sixteen wide field">
              <label>
                Address
                <input type="text" name="address" ref={register} />
              </label>
            </div>
          </div> */}
          <div className="fields">
            <div className="eight wide field">
              <label>
                Register Number
                <input type="number" name="rn" required ref={register} />
              </label>
            </div>

            <div className="eight wide field">
              <label>
                Your Sem.
                <select onChange={sh} required name="sem" ref={register}>
                  <option value="">Please select</option>
                  <option value="V">V</option>
                  <option value="VII">VII</option>
                </select>
                {/* <button
                  type="button"
                  name="sem5"
                  value="V"
                  onClick={() => setShow5(true) & setShow7(false)}
                >
                  V
                </button>{" "}
                &nbsp;
                <button
                  type="button"
                  name="sem7"
                  value="VII"
                  onClick={() => setShow7(true) & setShow5(false)}
                >
                  VII
                </button> */}
              </label>
            </div>
          </div>

          {/* <div className="fields">
            <div className="three wide field">
              <label>
                Zip
                <input type="text" name="zip" ref={register} />
              </label>
            </div>
            <div className="five wide field">
              <div className="field">
                <label>
                  Phone
                  <input type="text" name="phone" ref={register} />
                </label>
              </div>
              {/* <div className="field">
            <label>
              Specialty
              <select
                className="specialty"
                name="specialty"
                {...register("firstName", { required: true })}
              >
                <option value="field agent">Field Agent</option>
                <option value="covert operations">Covert Operations</option>
                <option value="intelligence officer">
                  Intelligence Officer
                </option>
              </select>
            </label>
          </div> */}
          {/* <div className="field">
              <label>
                ip
                <input type="text" name="ip" ref={register} />
              </label>
            </div> */}
          {/* </div> */}
          {/* </div> */}
          <hr />
          {show5 ? (
            <div>
              <h5>V SemB.Tech - R2018</h5>

              <div id="six" className="fields">
                <div className="three wide field">
                  <label>
                    Code
                    <input
                      type="text"
                      value="UIT1501"
                      readOnly
                      name="uit1501"
                      ref={register}
                    />
                    <input
                      type="text"
                      value="UIT1502"
                      readOnly
                      name="uit1502"
                      ref={register}
                    />
                    <input
                      type="text"
                      value="UIT1503"
                      readOnly
                      name="uit1503"
                      ref={register}
                    />
                    <input
                      type="text"
                      value="UIT1504"
                      readOnly
                      name="uit1504"
                      ref={register}
                    />
                    <input
                      type="text"
                      value="UIT1505"
                      readOnly
                      name="uit1505"
                      ref={register}
                    />
                    <input
                      type="text"
                      value="UIT1522"
                      readOnly
                      name="uit1522"
                      ref={register}
                    />
                  </label>
                </div>
                <div className="eight wide field">
                  <label>
                    Course Name
                    <input
                      type="text"
                      value="Finite Automata Theory"
                      readOnly
                      name="fat"
                    />
                    <input
                      type="text"
                      value="Principles of Operating Systems"
                      readOnly
                      name="pos"
                    />
                    <input
                      type="text"
                      value="Computer Networks and its Applications"
                      readOnly
                      name="cna"
                    />
                    <input
                      type="text"
                      value="Introduction to Digital Signal Processing"
                      readOnly
                      name="dsp"
                    />
                    <input
                      type="text"
                      value="Artificial Intelligence Concepts and Algorithms"
                      readOnly
                      name="ai"
                    />
                    <input
                      type="text"
                      value="Distributed Computing(PE 1)"
                      readOnly
                      name="dc"
                    />
                  </label>
                </div>
                <div className="five wide field">
                  <label>
                    Course Instructors
                    <select className="specialty" name="cifat" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. C. Aravindan">Dr. C. Aravindan</option>

                      <option value="Dr. T. SreeSharmila">
                        Dr. T. SreeSharmila
                      </option>
                    </select>
                    <select className="specialty" name="cipos" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. I. Joe Louis Paul">
                        Dr. I. Joe Louis Paul
                      </option>
                      <option value="Dr. N. Sripriya">Dr. N. Sripriya</option>
                    </select>
                    <select className="specialty" name="cicna" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. S. Chithra">Dr. S. Chithra</option>
                      <option value="Dr. K. Kabilan">Dr. K. Kabilan</option>
                    </select>
                    <select className="specialty" name="cidsp" ref={register}>
                      <option value="">Please select</option>
                      <option value="ECE Department">ECE Department</option>
                      <option value="BME Department">BME Department</option>
                    </select>
                    <select className="specialty" name="ciai" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. A. Shahina">Dr. A. Shahina</option>
                      <option value="Dr. P. Vasuki">Dr. P. Vasuki</option>
                    </select>
                    <select className="specialty" name="cidc" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. K. Kabilan">Dr. K. Kabilan</option>
                      <option value="Dr. A. Sandanakaruppan">
                        Dr. A. Sandanakaruppan
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          <hr />

          {show7 ? (
            <div>
              <h5>VII SemB.Tech - R2018</h5>
              <div id="seven" className="fields">
                <div className="three wide field">
                  <label>
                    Code
                    <input
                      type="text"
                      value="UIT1701"
                      readOnly
                      name="uit1701"
                      ref={register}
                    />
                    <input
                      type="text"
                      value="UIT1702"
                      readOnly
                      name="uit1702"
                      ref={register}
                    />
                    <input
                      type="text"
                      value="UIT1723"
                      readOnly
                      name="uit1723"
                      ref={register}
                    />
                  </label>
                </div>
                <div className="eight wide field">
                  <label>
                    Course Name
                    <input
                      type="text"
                      value="Cloud Computing and Virtualization"
                      readOnly
                      name="ccv"
                    />
                    <input
                      type="text"
                      value="Network Security"
                      readOnly
                      name="ns"
                    />
                    <input
                      type="text"
                      value="Developments and Operations (DevOps) - (PE III)"
                      readOnly
                      name="do"
                    />
                  </label>
                </div>
                <div className="five wide field">
                  <label>
                    Course Instructors
                    <select className="specialty" name="ciccv" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. A. Sandanakaruppan">
                        Dr. A. Sandanakaruppan
                      </option>
                      <option value="Dr. S. Sasirekha">Dr. S. Sasirekha</option>
                    </select>
                    <select className="specialty" name="cins" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. N. Radha">Dr. N. Radha</option>
                      <option value="Dr. E. M. Malathy">
                        Dr. E. M. Malathy
                      </option>
                    </select>
                    <select className="specialty" name="cido" ref={register}>
                      <option value="">Please select</option>
                      <option value="Dr. K. R. Uthayan">
                        Dr. K. R. Uthayan
                      </option>
                      <option value="Dr. R. Vinob Chander">
                        Dr. R. Vinob Chander
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            className="ui submit large grey button right floated"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
