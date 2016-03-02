class UsersController < ApplicationController

	def new
	end

	def create
	end

	def updatecharity
		user_charity = Charity.find_by(name: params[:charity])
		if current_user.charities.find_by(name: user_charity.name)
			old_charity = current_user.charities.find_by(name: user_charity.name)
			current_user.charities.delete(old_charity)
			current_user.charities << user_charity
		else
		current_user.charities << user_charity
		end
		redirect_to user_path(current_user)
	end

	def show
		@user = current_user
		render "profile"
	end
end
