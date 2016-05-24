var main = function()
{
	display();
	$('#searchField').keyup(function()
	{
			filter();
	});
}

var display = function()
{
	loadBegin('.panel-body');
	$('table tbody').empty();
	$.getJSON("src/skills.json", function(data)
	{
		data.forEach(function(skill)
		{
			putSkill(skill);
		});
	});
	loadEnd('.panel-body');
}

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

var loadBegin = function(what)
{
	var div = $('<div class="loading text-center alert alert-warning">').prependTo($(what));
	$('<i class="fa fa-spinner fa-spin fa-4x">').appendTo(div);
	$('<h3>').text('Loading...').appendTo(div);
	div.fadeIn();
}

var loadEnd = function(what)
{
	$(what + ' .loading').fadeOut(function()
	{
		$(what + ' .loading').remove();
	});
}

var putSkill = function(skill)
{
	var tr = $('<tr>').appendTo($('table tbody'));
	$('<td>').html('<span class="glyphicon glyphicon-glass"></span>').appendTo(tr);
	$('<th scope="row">').text(skill.name).appendTo(tr);
	$('<td>').text(skill.class).appendTo(tr);
	$('<td>').text(skill.level).appendTo(tr);
	$('<td>').text(skill.activation).appendTo(tr);
	$('<td>').text(skill.effect).appendTo(tr);
}

// :containsCI = :contains Case Insensitive
$.extend($.expr[":"], {
	"containsCI": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});

$(document).ready(main);
