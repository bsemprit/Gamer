class GameSession < ActiveRecord::Base
  belongs_to :gamer_profile
  belongs_to :user
end
