app = {
	views: {
		currView: {
			close: function() {},
		}
	},
	models: {},
};

app.models.MoActividades = Backbone.Model.extend({
	defaults: {
		idActividad: 0,
		nombre: '',
		creditos: 0,
		activo: 1,
	},
});
app.models.MoMaestros = Backbone.Model.extend({
	defaults: {
		idMaestro: 0,
		nombres: '',
		apaterno: '',
		amaterno: '',
		rfc: '',
		matricula: '',
	},
});
app.models.MoHorariosExtraescolares = Backbone.Model.extend({
	defaults: {
		idHorarioExtraescolar: 0,
		idActividad: 0,
		dia: '',
		horaIni: '',
		horaFin: '',
	},
});
app.models.MoMaestrosExtraescolares = Backbone.Model.extend({
	defaults: {
		idMaestroExtraescolar: 0,
		idMaestro: 0,
		idActividad: 0,
	},
});

window.CoActividadesList = Backbone.Collection.extend({
    model: app.models.MoActividades,
    /*url: 'actividades',*/
});
window.CoMaestrosList = Backbone.Collection.extend({
    model: app.models.MoMaestros,
    /*url: 'maestros',*/
});
window.CoHorariosExtraescolaresList = Backbone.Collection.extend({
    model: app.models.MoHorariosExtraescolares,
    /*url: 'horariosextraescolares',*/
});
window.CoMaestrosExtraescolaresList = Backbone.Collection.extend({
    model: app.models.MoMaestrosExtraescolares,
    /*url: 'maestrosextraescolares',*/
});

app.ViActividades = Backbone.View.extend({
    el: '#pnlActividades',
    events: {
    },
    initialize: function() {
    	this.crud = 1;
    },
    hide: function() {
        this.fakeModel = null;
        this.crud = 1;
        this.$el.foundation('reveal', 'close');
    },
    render: function() {
        this.crud = 1;
        console.log('actividades');
    },
    /* ---------------------------------------- eventos ---------------------------------------- */
});

app.router = Backbone.Router.extend({
    routes: {
        ''                  : 'index',        
        'actividades'   : 'actividades',
    },
    index: function() {
    },
    actividades: function() {
		app.views.currView.close();
		app.views.actividades = app.views.actividades || new app.ViActividades();
		app.views.actividades.render();
    },
});


$(document).ready(menu);

var contador = 1;

function menu(){
	$('header').click(function(){
		if(contador==1){
			 $('nav').animate({
				left: '0'
			});
			contador=0;
		}else{
			$('nav').animate({
				left: '-100%'
			});
			contador=1;
		}
	});
	$('.contenido').click(function(){
		if(contador==0){
			$('nav').animate({
				left: '-100%'
			});
			contador=1;
		}
	})

	app.colls = {
		actividades: new window.CoActividadesList(),
		maestros: new window.CoMaestrosList(),
		horariosextraescolares: new window.CoHorariosExtraescolaresList(),
		maestrosextraescolares: new window.CoMaestrosExtraescolaresList()
	};

	new app.router;
    Backbone.history.start({
        root: '/'
    });
};