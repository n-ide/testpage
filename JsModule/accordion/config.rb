http_path = ""
css_dir = "./css/"
sass_dir = "./scss"
cache_dir = "../.sass-cache"


asset_cache_buster :none

if (environment == :production)
  output_style = :expanded
else
  output_style = :expanded
end

relative_assets = true
line_comments = false

