function help() {
  divs = $x(
    '//*[@id="root"]/div/div/div[2]/div[2]/div[contains(@style, "opacity: 1")]'
  );
  formatted = [];
  divs.forEach((element) => {
    color = element.querySelectorAll("use")[1].getAttribute("stroke");
    quantity = element.querySelectorAll("svg").length;
    // get fill/pattern
    if (element.querySelector("use").getAttribute("fill") === "transparent") {
      fill = "transparent";
    } else if (element.querySelector("use").getAttribute("mask")) {
      fill = "striped";
    } else {
      fill = "solid";
    }
    shape = element.querySelector("use").getAttribute("href");
    formatted.push([color, quantity, fill, shape]);
  });

  function isCorrect(nums) {
    for (i = 0; i < 4; i++) {
      count = new Set();

      count.add(formatted[nums[0]][i]);
      count.add(formatted[nums[1]][i]);
      count.add(formatted[nums[2]][i]);

      if (count.size == 2) {
        return false;
      }
    }
    return true;
  }

  do {
    numbers = new Set();
    // pick 3 random numbers
    while (numbers.size < 3) {
      numbers.add(Math.floor(Math.random() * divs.length));
    }
  } while (!isCorrect(Array.from(numbers)));

  numbers.forEach((x) => {
    divs[x].querySelector("div").click();
  });
}
