class GameSessionsController < ApplicationController
	def create
		user = current_user
		gameSession = GameSession.create(session_params)
		user.score = user.score + gameSession.score
		if gameSession.score >= user.highscore
			user.highscore = gameSession.score
		end
		user.save
		render json: gameSession
	end

	def destroy
	end

	private

	def session_params
		params.require(:game_session).permit(:user_id, :score)
	end
end
