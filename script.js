var main = function()
{
	display();

	$('#searchField').keyup(function()
	{
			filter();
	});

	$('#search-addon').click(function()
	{
		$('#searchField').val('');
		$('#searchField').focus();
		filter();
	});

	$('tbody').on("click", "#class", function()
	{
		loadBegin('.modal-content');
		putClass($(this).text());
		loadEnd('.modal-content');
	});
}

// Puts all the skills
var display = function()
{
	$('#searchField').val('');
	loadBegin('.panel-body');
	$('table tbody').empty();
	$.getJSON("api.php?skill=all", function(data)
	{
		data.forEach(function(skill)
		{
			putSkill(skill);
		});
	});
	loadEnd('.panel-body');
}

// Filter matching any field in the table
var filter = function(event)
{
	var target = $('#searchField').val();
	if(target.length > 0)
	{
		$('tbody tr:containsCI(' + target + ')').fadeIn();
		$('tbody tr:not(:containsCI(' + target + '))').fadeOut();
	}
	else
	{
		$('tbody tr').fadeIn();
	}
}

// Create a loading div at the beginning of `what`
var loadBegin = function(what)
{
	var div = $('<div class="loading text-center alert alert-warning">').prependTo($(what));
	$('<i class="fa fa-spinner fa-spin fa-4x">').appendTo(div);
	$('<h3>').text('Loading...').appendTo(div);
	div.fadeIn();
}

// Hide and destroy the created loading div
var loadEnd = function(what)
{
	$(what + ' .loading').fadeOut(function()
	{
		$(what + ' .loading').remove();
	});
}

// Append `skill` to the table body
var putSkill = function(skill)
{
	var icon_name = skill.name.replace(/ /g, '_');
	var tr = $('<tr>').appendTo($('table tbody'));
	$('<td>').html('<img src="src/icons/' + icon_name + '.png" alt="' + icon_name + '">').appendTo(tr);
	$('<th scope="row">').text(skill.name).appendTo(tr);
	if(skill.class.length > 0)
	{
		var classtr = $('<td id="class" data-toggle="modal" data-target="#classModal">').appendTo(tr);
		$('<a class="label label-default">').text(skill.class).appendTo(classtr);
	}
	else
	{
		$('<td>').appendTo(tr);
	}
	$('<td class="text-right">').text(skill.level).appendTo(tr);
	$('<td>').text(skill.activation).appendTo(tr);
	$('<td class="not-capital">').text(skill.effect).appendTo(tr);
}

var putClass = function(class_name)
{
	$('.modal-title').text(class_name);
	var dl = $('.modal-body dl');
	dl.empty();
	$.getJSON('api.php?class=' + class_name, function(c)
	{
		makeDL("weapons", c.weapons, dl);
		makeDL("promotes from", c.promotes_from, dl);
		makeDL("promotes to", c.promotes_to, dl);
		makeDL("allows", c.ables, dl);
		makeDL("unit", c.unit, dl);
		makeDL("only", c.onlys, dl);
	});
}

var makeDL = function(text, what, ap)
{
	if(what.length < 1) return;
	$('<dt class="list-group-item">').text(text).appendTo(ap);
	var ul = $('<ul class="list-group list-group-horizontal">');
	ul.appendTo($('<dd>').appendTo(ap));
	what.forEach(function(x)
	{
		$('<li class="list-group-item">').text(x).appendTo(ul);
	});
}

// :containsCI = :contains Case Insensitive
$.extend($.expr[":"], {
	"containsCI": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});

$(document).ready(main);
