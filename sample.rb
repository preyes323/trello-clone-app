VALID_CHOICES = {
  "rock" => { char: "r", win: ["scissors", "lizard"] },
  "paper" => { char: "p", win: ["rock", "Spock"] },
  "scissors" => { char: "sc", win: ["paper", "lizard"] },
  "lizard" => { char: "l", win: ["paper", "Spock"] },
  "Spock" => { char: "sp", win: ["rock", "scissors"] }
}

sec1 = <<-RULES
If you ever played Rock-Paper-Scissors before - this game
created by Sam Kass, is an expansion of that.
RULES

sec2 = <<-RULES
The rules are as follows:
• scissors cuts paper
• paper covers rock
• rock crushes lizard
• lizard poisons Spock
• Spock smashes scissors
• scissors decapitates lizard
• lizard eats paper
• paper disproves Spock
• Spock vaporizes rock
• rock crushes scissors
RULES

sec3 = <<-RULES
The player to reach 3 wins first
is the grand winner!
RULES

RULES = [sec1, sec2, sec3]

def prompt(message)
  Kernel.puts("=> #{message}")
end

def empty_line
  Kernel.puts()
end

def player_continue
  ans = ""
  prompt("Type 'y' to continue")
  loop do
    ans = Kernel.gets().chomp()
    if ans == "y"
      break
    else
      prompt("Sorry, type 'y' to continue")
    end
  end
  system("clear")
end

def player_continue_exit
  valid_ans = ["y", "n"]
  ans = ""
  prompt("Type 'y' to continue")
  prompt("Type 'n' to exit game")
  loop do
    ans = Kernel.gets().chomp()
    if valid_ans.include?(ans)
      break
    else
      prompt("Sorry, type 'y' to continue")
    end
  end
  system("clear")
  ans
end

def how_to_play(rules)
  index = 0
  loop do
    prompt(rules[index])
    empty_line
    player_continue
    index += 1
    break if index > 2
  end
end

def get_char
  choices = []
  VALID_CHOICES.values.map do |x|
    choices.push(x[:char])
  end
  char = ""
  loop do
    char = Kernel.gets().chomp()
    if choices.include?(char)
      break
    else
      prompt("That's not a valid choice!")
    end
  end
  char
end

def choice(get_char)
  VALID_CHOICES.each do |x, y|
    if VALID_CHOICES[x][:char] == get_char
      return VALID_CHOICES.key(y)
    else
      next
    end
  end
end

def win?(first, second)
  VALID_CHOICES[first] && VALID_CHOICES[first][:win].include?(second)
end

def grand_winner(user, computer)
  if user == 3
    "You are the grand winner!"
  elsif computer == 3
    "The computer is the grand winner!"
  end
end

def display_results(first, second)
  prompt("You chose: #{first}, Computer chose: #{second}")
  if win?(first, second)
    "You win!"
  elsif win?(second, first)
    "Computer wins!"
  else
    "It's a tie!"
  end
end

def display_score(user, computer)
  prompt("PLAYER SCORE: #{user} | COMPUTER SCORE: #{computer}")
  empty_line
end

prompt("Let's play #{VALID_CHOICES.keys.join('-')}!")
how_to_play(RULES)

loop do
  user_score = 0
  computer_score = 0

  prompt("Ready to play?")
  player_continue
  system("clear")

  loop do
    prompt("Type 'r' for rock")
    prompt("Type 'p' for paper")
    prompt("Type 'sc' for scissors")
    prompt("Type 'l' for lizard")
    prompt("Type 'sp' for Spock")

    user_choice = choice(get_char)
    computer_choice = VALID_CHOICES.keys.sample
    winner = display_results(user_choice, computer_choice)

    prompt(winner)
    if winner == "You win!"
      user_score += 1
    elsif winner == "Computer wins!"
      computer_score += 1
    end

    display_score(user_score, computer_score)

    if grand_winner(user_score, computer_score)
      prompt(grand_winner(user_score, computer_score))
      empty_line
      break
    else
      prompt("Ready for the next round?")
      player_continue
    end
  end

  prompt("Would you like to play again?")
  break if player_continue_exit == "n"
end

prompt("HAIL SAM KASS! - Thank you for playing :)")
