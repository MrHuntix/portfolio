let projects = {};

let display = (index) => {
    let project = projects[index];
    console.log(project);
};

$(document).ready(function () {
    let projectList = $("#projectList");
    let projectDetails = $("#details");

    $.ajaxSetup({
        async: false
    });

    $.getJSON("/assets/projects.json", (data) => {
        projects = data;
        updateDetails(projectDetails, 0)
    });

    $.ajaxSetup({
        async: true
    });

    projects.forEach((project, index) => {
        var caroselItem = $(`<div id=${project["name"]}></div>`);
        if (index === 0)
            caroselItem.addClass("carousel-item active");
        else
            caroselItem.addClass("carousel-item");
        var caroselCaption = $('<div class="card bg-secondary"></div>');
        var heading = $(`<div class="card-header caption"><h3>${project["name"]}</h3></div>`);
        var description = $(`<div class="card-body caption"><p>${project["description"]}</p></div>`);
        // var button = $("<button>details</button>");
        caroselCaption.append(heading, description);
        caroselItem.append(caroselCaption);
        projectList.append(caroselItem);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $("#myNavBar").removeClass("bg-transparent").addClass("bg-dark");
        } else {
            $("#myNavBar").removeClass("bg-dark").addClass("bg-transparent");
        }
    });

    $("#demo").on('slide.bs.carousel', function (event) {
        updateDetails(projectDetails, event.to);
    });
});

function updateDetails(element, index) {
    let project = projects[index];
    element.empty();
    element.append(`<p class="lead">${project["name"]}<br/>${project["description"]}</p><br/>`);
    element.append(`<p class="lead">Tech Stack: ${project["languages"].join()}</p><br/>`);
    element.append(`<p class="lead">Links: <a href="${project["code"]}" data-toggle="tooltip" title="open in github">github</a>${project["live"] == "no" ? '' : ` | <a href="${project["live"]}" data-toggle="tooltip" title="try the live version">try</a>`}</p>`)

}