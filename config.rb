# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

activate :directory_indexes

activate :external_pipeline,
  name: :parcel,
  command: build? ? 'NODE_ENV=production yarn build-js' : 'yarn dev',
  source: 'tmp/assets',
  latency: 1

activate :external_pipeline,
  name: :image,
  command: "ruby gallery.rb #{'--watch' unless build?}",
  source: 'tmp/gallery',
  latency: 1

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify HTML on build
  activate :minify_html do |html|
    html.remove_input_attributes  = false
    html.preserve_line_breaks     = true
  end

  # Gzip everything
  activate :gzip

  # Fingerprints on assets
  activate :asset_hash, ignore: %w(stylesheets/default-skin.svg),
    exts: (app.config[:asset_extensions] - %w(.ico .map) + %w(.mp4))
end

activate :s3_sync
