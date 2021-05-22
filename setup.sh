echo "Setting up Nametags project"

echo "Adding runServer script permissions..."
chmod +x runServer 
echo "Done"

echo "Setting up Python virtual environment..."
python3 -m venv env
echo "Done"
echo "Entering virtual environment..."
source env/bin/activate
echo "Installing Python dependencies..."
pip3 install -r requirements.txt
echo "Done"
echo "Installing Javascript dependencies..."
npm install . --legacy-peer-deps
echo "Done"

echo "Finished setup"
