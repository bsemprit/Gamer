class CreateGameSessions < ActiveRecord::Migration
  def change
    create_table :game_sessions do |t|
      t.references :gamer_profile, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.integer :score

      t.timestamps null: false
    end
  end
end
