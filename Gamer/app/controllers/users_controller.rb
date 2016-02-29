class UsersController < ApplicationController

	def new
	end

	def create
	end

	def updatecharity
		user_charity = Charity.find_by(name: params[:charity])
		current_user.charities << user_charity
		redirect_to user_path(current_user)
	end

	def show
		@user = current_user
		render "profile"
	end
end
