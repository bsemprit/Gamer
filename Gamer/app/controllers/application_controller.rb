class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
  	devise_parameter_sanitizer.for(:users) << :role
  end

   def admin_only
    unless current_user && current_user.role == 'adminGamer'
      redirect_to "/"
    end        
  end
end
