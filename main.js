// Store questions, correct answer and the choices/options to be displayed
// along with he question.
let question_array = [
    {
      question: "Is the Earth flat?",
      answer: "no",
      options: ["yes", "no"],
      option_type: "radio"
    },
    {
      question: "Is the Sun bigger than the Earth?",
      answer: "no",
      options: ["yes", "no"],
      option_type: "radio"
    },
    {
      question: "Does Saturn have rings?",
      answer: "yes",
      options: ["yes", "no"],
      option_type: "radio"
    },
    {
      question: "Can squirrels fly?",
      answer: "yes",
      options: ["yes", "no"],
      option_type: "radio"
    },
    {
      question: "How many legs does an elephant have?",
      answer: "4",
      options: [4, 7, 12],
      option_type: "radio"
    },
    {
      question: "What is the capital of Rwanda?",
      answer: "Kigali",
      options: ["Wakanda", "Cape Town", "Kigali"],
      option_type: "radio"
    },
    {
      question: "Who is the president of USA?",
      answer: "Joe Biden",
      options: ["Steve Rogers", "Joe Biden", "Elon Musk"],
      option_type: "radio"
    },
    {
      question: "How many legs does elephants have?",
      answer: ["8 (If they are standing together)", "4"],
      options: ["4", "16", "8 (If they are standing together)"],
      option_type: "checkbox"
    },
    {
      question: "Which of the following are fishes?",
      answer: ["Salmon", "Herring"],
      options: ["Herring", "Screaming", "Salmon", "Lemons"],
      option_type: "checkbox"
    }
  ];
  let score = 0;
  
  let submit_button = document.querySelector("#mysubmit");
  let my_container = document.querySelector("#container");
  let my_message = document.querySelector("#message");
  
  // Function to display all questions from the question_array
  function displayQuestions(question_number, question) {
    let question_element = document.createElement("h3");
    question_element.textContent = question_number + ". " + question;
    my_container.appendChild(question_element);
  }
  
  // Function to display radio buttons depending on the number of options
  // in the question
  function displayButtons(
    question_group,
    options,
    num_of_options,
    type_of_options
  ) {
    // Dynamically create the number of radio buttons based on the number of options
    // for each question.
    for (let opt = 0; opt < num_of_options; opt++) {
      if (type_of_options === "radio") {
        let opt_rb = document.createElement("input");
        let opt_rb_label = document.createElement("label");
        opt_rb.type = "radio";
        opt_rb.value = options[opt];
        opt_rb.name = question_group;
        opt_rb_label.innerHTML = opt_rb.value;
        my_container.appendChild(opt_rb);
        my_container.appendChild(opt_rb_label);
      } else {
        let opt_cb = document.createElement("input");
        let opt_cb_label = document.createElement("label");
        opt_cb.type = "checkbox";
        opt_cb.value = options[opt];
        opt_cb.name = question_group;
        opt_cb_label.innerHTML = opt_cb.value;
        my_container.appendChild(opt_cb);
        my_container.appendChild(opt_cb_label);
      }
    }
  }
  
  // Display all objects on page
  // Number of objects on the page is determined by the number of questions
  // in the question_array
  for (let q_num = 0; q_num < question_array.length; q_num++) {
    // question number + 1 because the array index starts with 0.
    displayQuestions(q_num + 1, question_array[q_num].question);
    displayButtons(
      q_num,
      question_array[q_num].options,
      question_array[q_num].options.length,
      question_array[q_num].option_type
    );
  }
  
  function save(score) {
    my_message.innerHTML = "Your final score is " + score + "&#9786;";
  }
  // At the end, verify answers and print response.
  // Calculate the score only after the submit button is clicked.
  submit_button.addEventListener("click", () => {
    // iterate through each question
    for (let q_num = 0; q_num < question_array.length; q_num++) {
      let checkbox_count = 0;
      // The group name for the radio buttons is 'hacked' to dynamically
      // select each group. The groups are named after the question_array index (q_num)
      let buttons = document.querySelectorAll("[name='" + q_num + "']");
      // Iterate through each radio button to verify the one that is checked.
      // q_num = question number and r_btn = number of radio buttons for that question.
      // So we are comparing the 'checked' or selected radio button with the
      // answer from the question array :)
      for (let btn = 0; btn < buttons.length; btn++) {
        // Calculate score only for questions where an answer was selected
        if (buttons[btn].checked) {
          // console.log(buttons[btn]);
          //if option_type is raadio
          if (question_array[q_num].option_type === "radio") {
            if (buttons[btn].value === question_array[q_num].answer) {
              score = score + 1;
            }
          } else {
            checkbox_count = checkbox_count + 1;
            if (checkbox_count > question_array[q_num].answer.length) {
              // question number + 1 because the array index starts with 0.
              let int_q_num = q_num + 1;
              alert(
                "You can select maximum of " +
                  question_array[q_num].answer.length +
                  " checkboxes for question " +
                  int_q_num
              );
              buttons[btn].checked = false;
              continue;
            }
            // for each answer in answer array
            // compare buttons[btn] with answer[i]
            // score ++
            for (let ans = 0; ans < question_array[q_num].answer.length; ans++) {
              if (buttons[btn].value === question_array[q_num].answer[ans]) {
                score = score + 1;
              }
            }
          }
        }
      }
    }
    save(score);
  });
  