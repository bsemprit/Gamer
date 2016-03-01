class GamesController < ApplicationController
	before_action :authenticate_user!
	before_action :admin_only, only: [:new, :create]
	def new
		@game = Game.new
		@game.game_image = params[:file] 
	end

	def create
		game = Game.new(game_params)

		if game.save
			redirect_to games_path
		else
			render "index"
		end
	end

	def index
		@games = Game.all
	end

	def show
		@game = Game.find_by(id: params[:id])
	end

	private

	def game_params
		params.require(:game).permit(:name, :game_image, :description, :time)
	end
end
