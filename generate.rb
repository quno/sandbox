#!/usr/bin/env ruby
require 'benchmark'

puts "Usage: #{__FILE__} characters lines [special characters(true/false)]" if ARGV.length < 2

# 引数
chars  = ARGV[0].to_i.nonzero? || 16
lines  = ARGV[1].to_i.nonzero? || 20
spchar = ARGV[2] || 'false'

# 文字配列一覧
ALPHABET_LOWER = ('a'..'z').to_a.freeze
ALPHABET_UPPER = ALPHABET_LOWER.map(&:upcase).freeze
NUMBER = ('0'..'9').to_a.freeze
SPECIAL_CHAR = "!\"#$%&'()=-~^|\\`@{}[]+*;:<>,./?_".chars.to_a.freeze

# 配列連結
char_array =
  if spchar == 'true'
    ALPHABET_LOWER + ALPHABET_UPPER + NUMBER + SPECIAL_CHAR
  else
    ALPHABET_LOWER + ALPHABET_UPPER + NUMBER
  end

# 処理時間計測
result = Benchmark.realtime do
  # 文字列生成
  lines.times do
    pass_phrase = ''
    chars.times { pass_phrase << char_array.sample }
    puts pass_phrase
  end
end
puts "(Process Time: #{(result * 1000).round(4)}ms)"
