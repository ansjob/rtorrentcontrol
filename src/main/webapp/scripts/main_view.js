define([],function(){

	var MainView = {
		showView: function(view) {
			if (this.currentView){
				this.currentView.close();
			}

			this.currentView = view;
			this.currentView.render();

			$("#content").html(this.currentView.el);
		}
	};

	return MainView;
});