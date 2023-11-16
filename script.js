$(document).ready(function () {
  let button_submit = $("#button_submit");
  let button_clear = $("#button_clear");
  let input_text = $("#input_text");
  let country_info = $("#country_info");

  // Fetch country data
  button_submit.click(function () {
    let country_name = input_text.val();
    let url = "https://restcountries.com/v3.1/name/" + country_name;
    $.ajax({
      url: url,
      success: function (result) {
        let country = result[0];
        country_info.empty();
        country_info.append(
          `<img src="${country.flags.png}" alt="Flag of ${country.name.official}">`
        );
        country_info.append(`<p>Official Name: ${country.name.official}</p>`);
        country_info.append(`<p>Capital: ${country.capital[0]}</p>`);
        let currencySymbol = Object.keys(country.currencies)[0];
        country_info.append(
          `<p>Currency: ${country.currencies[currencySymbol].name}</p>`
        );
        country_info.append(`<p>Currency Code: (${currencySymbol})</p>`);
        country_info.append(`<p>Region: ${country.region}</p>`);
      },
      error: function () {
        country_info.html(
          "<p>Error fetching country information. Please try again.</p>"
        );
      },
    });
  });

  // Clear country data
  button_clear.click(function () {
    country_info.empty();
    input_text.val("");
  });

  // Additional events
  input_text.keyup(function (event) {
    if (event.keyCode === 13) {
      button_submit.click();
    }
  });

  input_text.dblclick(function () {
    input_text.val("");
  });
});
