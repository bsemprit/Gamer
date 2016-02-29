class GamesController < ApplicationController
	before_action :authenticate_user!
	before_action :admin_only, only: [:new, :create]
	def new
		@game = Game.new
		@game.game_image = params[:file] 
	end

	def create

		redirect_to "index"
	end

	def index
		@games = Game.all
	end
end