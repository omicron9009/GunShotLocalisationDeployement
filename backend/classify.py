import numpy as np
import librosa
import joblib
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from IPython.display import Audio, display
from skimage.transform import resize
import io 
import soundfile as sf

def predict(audio_path):
        # Load the audio file

    model = load_model("gunshot_classification_mobilenet.h5")
    categories= ['AK-12', 'AK-47', 'IMI Desert Eagle', 'M16', 'M249', 'M4', 'MG-42', 'MP5', 'Zastava M92']
    # Encode the labels
    label_encoder = LabelEncoder()
    label_encoder.fit(categories)

    audio_path.seek(0)

    # Load audio using soundfile directly (returns audio + sample rate)
    y, sr = sf.read(audio_path)
    if y.ndim > 1:  # If stereo, take one channel
        y = y[:, 0]

    # Generate MFCCs
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfccs = np.expand_dims(mfccs, axis=-1)
    mfccs = resize(mfccs, [448, 448])
    mfccs = np.concatenate([mfccs] * 3, axis=-1)  # Convert to 3 channels
    mfccs = np.expand_dims(mfccs, axis=0)

    # Predict
    prediction = model.predict(mfccs)
    predicted_class = label_encoder.inverse_transform([np.argmax(prediction)])
    print(f'Predicted Category: {predicted_class[0]}')
    return predicted_class[0]

# predict("C:\\Users\\jadit\\OneDrive\\Desktop\\SIT\\SEM-6\\PBL\\Classification\\test\\M4\\4 (2).wav")