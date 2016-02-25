class Session < ActiveRecord::Base
  belongs_to :game_profile
  belongs_to :user
end
